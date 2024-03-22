const express = require('express');
const { createPool } = require('mysql');
const cors = require('cors');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    key: "userid",
    secret: "nguyendepzai",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    }
}));

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "cos30049",
    connectionLimit: 100
});

pool.getConnection((err) => {
    if (err) {
        console.log("Connection failed");
    } else {
        console.log("Successfully Connected");
    }
});

app.listen(8080, () => {
    console.log("Server listening on port 8080");
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    pool.query(
        "SELECT PID, username, password FROM patientaccount WHERE username = ? AND password = ?",
        [username, password],
        (err, patientResult) => {
            if (err) {
                res.send({ err: err });
            } else if (patientResult.length > 0) {
                const patientId = patientResult[0].PID;
                req.session.userType = 'patient';
                req.session.userId = patientId;
                res.send({ userType: 'patient', userId: patientId });
            } else {
                pool.query(
                    "SELECT DID, username, password FROM doctor WHERE username = ? AND password = ?",
                    [username, password],
                    (err, doctorResult) => {
                        if (err) {
                            res.send({ err: err });
                        } else if (doctorResult.length > 0) {
                            const doctorId = doctorResult[0].DID;
                            req.session.userType = 'doctor';
                            req.session.userId = doctorId;
                            res.send({ userType: 'doctor', userId: doctorId });
                        } else {
                            res.send({ message: "Wrong username/password combination!" });
                        }
                    }
                );
            }
        }
    );
});

app.get('/patient-appointment/:userId', (req, res) => {
    const userId = req.params.userId;

    pool.query(
        'SELECT * FROM appointments WHERE PID = ?',
        [userId],
        (err, results) => {
            if (err) {
                console.error('Error retrieving appointments:', err);
                res.status(500).json({ error: 'Internal server error' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Appointments not found' });
            } else {
                res.json(results);
                console.log(results);
            }
        }
    );
});

app.get('/doctor-appointment/:userId', (req, res) => {
    const userId = req.params.userId;

    pool.query(
        'SELECT * FROM appointments WHERE DID = ?',
        [userId],
        (err, results) => {
            if (err) {
                console.error('Error retrieving appointments:', err);
                res.status(500).json({ error: 'Internal server error' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Appointments not found' });
            } else {
                res.json(results);
                console.log(results);
            }
        }
    );
});

app.get('/treatmentplan/:userId', (req, res) => {
    const userId = req.params.userId;

    pool.query(
        'SELECT * FROM treatment_detail WHERE PID = ?',
        [userId],
        (err, results) => {
            if (err) {
                console.error('Error retrieving treatment plan:', err);
                res.status(500).json({ error: 'Internal server error' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Treatment plan not found' });
            } else {
                console.log(results);
                res.json(results);
            }
        }
    );
});

app.get('/medical-summary/:userId', (req, res) => {
    const userId = req.params.userId;

    pool.query(
        'SELECT * FROM medical_summary WHERE PID = ?',
        [userId],
        (err, results) => {
            if (err) {
                console.error('Error retrieving medical summary:', err);
                res.status(500).json({ error: 'Internal server error' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Medical summary not found' });
            } else {
                res.json(results[0]);
            }
        }
    );
});

app.get('/patient-info/:customerId', (req, res) => {
    const customerId = req.params.userId;

    pool.query(
        "SELECT * FROM patientinformation WHERE PID = ?",
        [userId],
        (err, result) => {
            if (err) {
                res.status(500).send({ err: err });
            } else {
                res.send(result[0]);
            }
        }
    );
});

app.post('/makeappointment', (req, res) => {
    const sql = "INSERT INTO appointments (`AID`, `PID`, `DID`, `FullnamePatient`, `FullnameDoctor`, `AppointmentDate`, `VisitReason`, `AppointStatus`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.AID,
        req.body.PID,
        req.body.DID,
        req.body.FullnamePatient,
        req.body.FullnameDoctor,
        req.body.AppointmentDate,
        req.body.VisitReason,
        req.body.AppointStatus
    ];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error making appointment:", err);
            return res.json({ message: "Appointment creation failed" });
        }
        console.log("Appointment created successfully:", result);
        return res.json({ message: "Appointment created successfully" });
    });
});

app.put('/makeappointment/:appId', (req, res) => {
    const appId = req.params.appId;
    const updatedFields = req.body;

    const sql = 'UPDATE appointments SET FullnamePatient = ?, FullnameDoctor = ?, AppointmentDate = ?, VisitReason = ? WHERE AID = ?';
    const values = [
        updatedFields.patientName,
        updatedFields.doctorName,
        updatedFields.appointmentDate,
        updatedFields.visitReason,
        appId,
    ];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating appointment:', err);
            return res.status(500).json({ success: false, message: 'Failed to update appointment' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        console.log('Appointment updated successfully:', result);
        return res.json({ success: true, message: 'Appointment updated successfully' });
    });
});


app.post('/PInfor', (req, res) => {
    const sql = "INSERT INTO patientinformation (`PID`, `DID`, `FirstName`, `LastName`, `DoB`, `Gender`, `ContactNumber`, `address`, `email`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.PID,
        req.body.DID,
        req.body.FirstName,
        req.body.LastName,
        req.body.DoB,
        req.body.Gender,
        req.body.ContactNumber,
        req.body.address,
        req.body.email
    ];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error making patient information:", err);
            return res.json({ message: "Patient information upload failed" });
        }
        console.log("Patient information upload successfully:", result);
        return res.json({ message: "Patient information upload successfully" });
    });
});

app.get('/patients', (req, res) => {
    const sql = "SELECT * FROM patientinformation WHERE PID = ?";

    const values = [
        req.query.PID,
        req.query.DID,
        req.query.FirstName,
        req.query.LastName,
        req.query.DoB,
        req.query.Gender,
        req.query.ContactNumber,
        req.query.Address,
        req.query.Email
    ];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error fetching patient data:', err);
            return res.status(500).json({ error: 'Error fetching patient data' });
        }

        res.json(result);
    });
});

app.get('/billcreation', (req, res) => {
    const sql = "SELECT * FROM billcreation";

    const values = [
        req.query.bill_id,
        req.query.PID,
        req.query.DID,
        req.query.Doctors_name,
        req.query.Patients_name,
        req.query.bill_date,
        req.query.total_cost,
        req.query.bill_desc,
        req.query.payment_confirmation
    ];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error fetching bill creation data:', err);
            return res.status(500).json({ error: 'Error fetching bill creation data' });
        }

        res.json(result);
    });
});


app.put('/billcreation/:bill_id', (req, res) => {
    const billId = req.params.bill_id;
    const paymentConfirmation = req.body.payment_confirmation; 
  
    const sql = "UPDATE billcreation SET payment_confirmation = ? WHERE bill_id = ?";
  
    pool.query(sql, [paymentConfirmation, billId], (err, result) => {
      if (err) {
        console.error('Error updating payment confirmation:', err);
        return res.status(500).json({ error: 'Error updating payment confirmation' });
      }
  
      res.json({ message: 'Payment confirmation updated successfully' });
    });
});


