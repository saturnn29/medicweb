import React from "react";
import LSstyle from '';

function About() {
    return (
        <section class={LSstyle.sectionwhite}>
            <div class={LSstyle.aboutContainer}>
                <div class={LSstyle.aboutRow}>
                    <div class={LSstyle.textCenter}>
                        <h2 class={LSstyle.sectionTitle}>The Team Behind AuspexCare</h2>
                        <p class={LSstyle.subtitle}>{message}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}