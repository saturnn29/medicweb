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
    database: "reallwebmedicvippro",
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

app.delete('/delete-bill/:billId', (req, res) => {
    const billId = req.params.billId;
    pool.query('DELETE FROM billcreation WHERE bill_id = ?', [billId], (err, result) => {
        if (err) {
            console.error('Error deleting bill:', err);
            return res.status(500).send('Error deleting bill');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Bill not found');
        }

        res.sendStatus(204);
    });
});

app.put('/update-bill/:billId', (req, res) => {
    const billId = req.params.billId;
    const { billDate, totalCost, billDesc, paymentConfirmation } = req.body;

    pool.query(
        'UPDATE billcreation SET bill_date = ?, total_cost = ?, bill_desc = ?, payment_confirmation = ? WHERE bill_id = ?',
        [billDate, totalCost, billDesc, paymentConfirmation, billId],
        (err, result) => {
            if (err) {
                console.error('Error updating bill:', err);
                return res.status(500).send('Error updating bill');
            }

            if (result.affectedRows === 0) {
                return res.status(404).send('Bill not found');
            }

            res.sendStatus(200);
        }
    );
});

app.get('/get-bills/:userId', (req, res) => {
    const userId = req.params.userId;

    pool.query(
        'SELECT * FROM billcreation WHERE PID = ?',
        [userId],
        (err, results) => {
            if (err) {
                console.error('Error retrieving bill creation:', err);
                res.status(500).json({ error: 'Internal server error' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Bill creation not found' });
            } else {
                res.json(results);
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
            }
        }
    );
});


app.get('/treatmentdetail/:userId', (req, res) => {
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
                res.json(results);
            }
        }
    );
});

app.get('/billdetail/:userId', (req, res) => {
    const userId = req.params.userId;
    pool.query(
        'SELECT * FROM billcreation WHERE PID = ?',
        [userId],
        (err, results) => {
            if (err) {
                console.error('Error retrieving treatment plan:', err);
                res.status(500).json({ error: 'Internal server error' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Treatment plan not found' });
            } else {
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

app.put('/medical-summary/:customerId', (req, res) => {
    const customerId = req.params.customerId;
    const updatedMS = req.body;

    const sql = 'UPDATE medical_summary SET ChiefComplaint = ?, BloodPressure = ?, HeartRate = ?, RespiratoryRate = ?, ChronicIllnesses = ?, PreviousMedicalEvents = ?, LaboratoryResults = ?, Temperature = ? WHERE PID = ? AND (ChiefComplaint <> ? OR BloodPressure <> ? OR HeartRate <> ? OR RespiratoryRate <> ? OR ChronicIllnesses <> ? OR PreviousMedicalEvents <> ? OR LaboratoryResults <> ? OR Temperature <> ?)';
    const values = [
        updatedMS.ChiefComplaint,
        updatedMS.BloodPressure,
        updatedMS.HeartRate,
        updatedMS.RespiratoryRate,
        updatedMS.ChronicIllnesses,
        updatedMS.PreviousMedicalEvents,
        updatedMS.LaboratoryResults,
        updatedMS.Temperature,
        customerId,
        updatedMS.ChiefComplaint,
        updatedMS.BloodPressure,
        updatedMS.HeartRate,
        updatedMS.RespiratoryRate,
        updatedMS.ChronicIllnesses,
        updatedMS.PreviousMedicalEvents,
        updatedMS.LaboratoryResults,
        updatedMS.Temperature
    ];


    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating medical summary:', err);
            return res.status(500).json({ success: false, message: 'Failed to update medical summary' });
        }

        console.log('Medical Summary updated successfully:', result);
        return res.json({ success: true, message: 'Medical summary updated successfully' });
    });
});

app.get('/treatmentplan/:userId', (req, res) => {
    const userId = req.params.userId;

    pool.query(
        'SELECT * FROM treatmentplan WHERE PID = ?',
        [userId],
        (err, results) => {
            if (err) {
                console.error('Error retrieving treatment plan:', err);
                res.status(500).json({ error: 'Internal server error' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Treatment plan not found' });
            } else {
                res.json(results[0]);
            }
        }
    );
});

app.put('/treatmentplan/:customerId', (req, res) => {
    const customerId = req.params.customerId;
    const updatedTP = req.body;

    const sql = 'UPDATE treatmentplan SET Medications = ?, PhysicalTherapy = ?, OccupationalTherapy = ?, RecFollowUpAppointment = ?, GuideMonitorSymtopms = ? WHERE PID = ? AND (Medications <> ? OR PhysicalTherapy <> ? OR OccupationalTherapy <> ? OR RecFollowUpAppointment <> ? OR GuideMonitorSymtopms <> ?)';
    const values = [
        updatedTP.Medications,
        updatedTP.PhysicalTherapy,
        updatedTP.OccupationalTherapy,
        updatedTP.RecFollowUpAppointment,
        updatedTP.GuideMonitorSymtopms,
        customerId,
        updatedTP.Medications,
        updatedTP.PhysicalTherapy,
        updatedTP.OccupationalTherapy,
        updatedTP.RecFollowUpAppointment,
        updatedTP.GuideMonitorSymtopms
    ];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating treatmentplan:', err);
            return res.status(500).json({ success: false, message: 'Failed to update treatment plan' });
        }
        
        console.log('Medical Summary updated successfully:', result);
        console.log('Query result:', result);
        return res.json({ success: true, message: 'Treatment plan updated successfully' });
    });
});

app.get('/patient-info/:userId', (req, res) => {
    const userId = req.params.userId;

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

app.get('/doctor-contact/:userId', (req, res) => {
    const userId = req.params.userId;

    pool.query(
        "SELECT * FROM patientinformation WHERE DID = ?",
        [userId],
        (err, results) => {
            if (err) {
                console.error('Error retrieving doctors contacts:', err);
                res.status(500).json({ error: 'Internal server error' });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Contacts not found' });
            } else {
                res.json(results);
            }
        }
    );
});

app.post('/submit-bill', (req, res) => {
    const { customerId, userId, billDate, totalCost, billDesc, paymentConfirmation } = req.body;

    const doctorQuery = 'SELECT fullname FROM doctor WHERE DID = ?';
    pool.query(doctorQuery, [userId], (err, doctorResult) => {
        if (err) {
            console.error('Error fetching doctor name:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        const doctorName = doctorResult[0];

        const patientQuery = 'SELECT LastName FROM patientinformation WHERE PID = ?';
        pool.query(patientQuery, [customerId], (err, patientResult) => {
            if (err) {
                console.error('Error fetching patient name:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            const patientName = patientResult[0];

            const insertQuery = 'INSERT INTO billcreation (PID, DID, Doctors_name, Patients_name, bill_date, total_cost, bill_desc, payment_confirmation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [customerId, userId, doctorName.fullname, patientName.LastName, billDate, totalCost, billDesc, paymentConfirmation];
            pool.query(insertQuery, values, (err, result) => {
                if (err) {
                    console.error('Error inserting bill:', err);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }

                res.status(200).json({ message: 'Bill submitted successfully' });
            });
        });
    });
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

        return res.json({ success: true, message: 'Appointment updated successfully' });
    });
});


app.post('/PInfor', (req, res) => {
    const sql = "INSERT INTO patientinformation (`DID`, `FirstName`, `LastName`, `DoB`, `Gender`, `ContactNumber`, `address`, `email`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.DID,
        req.body.FirstName,
        req.body.LastName,
        req.body.DOB,
        req.body.Gender,
        req.body.Phone,
        req.body.Address,
        req.body.Email
    ];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error making patient information:", err);
            return res.json({ message: "Patient information upload failed" });
        }
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