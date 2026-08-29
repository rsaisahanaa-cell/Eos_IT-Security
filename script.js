/* ==========================================
   GRIDSHIELD SECURITY DASHBOARD
   Defensive simulation only
========================================== */


// ==========================================
// ASSET DATABASE
// ==========================================

let assets = [

    {
        id: "SM-1042",
        type: "Smart Meter",
        behaviour: "Normal",
        anomaly: 18,
        status: "SAFE"
    },

    {
        id: "EV-2088",
        type: "EV Charger",
        behaviour: "Unusual",
        anomaly: 64,
        status: "WATCH"
    },

    {
        id: "PV-3301",
        type: "Solar Inverter",
        behaviour: "Normal",
        anomaly: 21,
        status: "SAFE"
    },

    {
        id: "SM-1189",
        type: "Smart Meter",
        behaviour: "Coordinated",
        anomaly: 91,
        status: "CRITICAL"
    },

    {
        id: "BAT-4091",
        type: "Battery System",
        behaviour: "Normal",
        anomaly: 14,
        status: "SAFE"
    },

    {
        id: "EV-2124",
        type: "EV Charger",
        behaviour: "Unusual",
        anomaly: 57,
        status: "WATCH"
    }

];


// ==========================================
// ALERT DATABASE
// ==========================================

let alerts = [

    {
        level: "red",
        icon: "🚨",
        title: "Coordinated behaviour detected",
        message:
            "12 customer assets show correlated abnormal activity.",
        time: "2 min ago"
    },

    {
        level: "yellow",
        icon: "⚠️",
        title: "Asset behaviour deviation",
        message:
            "EV-2088 exceeded its established behaviour baseline.",
        time: "7 min ago"
    },

    {
        level: "red",
        icon: "🚨",
        title: "High anomaly score",
        message:
            "SM-1189 reached an anomaly score of 91.",
        time: "11 min ago"
    },

    {
        level: "green",
        icon: "✓",
        title: "Threat containment recommended",
        message:
            "Defensive response actions generated.",
        time: "16 min ago"
    }

];


// ==========================================
// RENDER ASSETS
// ==========================================

function renderAssets() {

    const table =
        document.getElementById("assetTable");

    table.innerHTML = "";


    assets.forEach(asset => {

        let anomalyClass = "anomaly-low";

        if (asset.anomaly >= 50 &&
            asset.anomaly < 80) {

            anomalyClass = "anomaly-medium";

        }

        if (asset.anomaly >= 80) {

            anomalyClass = "anomaly-high";

        }


        let statusClass = "safe";

        if (asset.status === "WATCH") {

            statusClass = "watch";

        }

        if (asset.status === "CRITICAL") {

            statusClass = "critical";

        }


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${asset.id}</td>

            <td>${asset.type}</td>

            <td>${asset.behaviour}</td>

            <td>

                <div class="anomaly">

                    <div class="anomaly-bar">

                        <div
                            class="${anomalyClass}"
                            style="width:${asset.anomaly}%">
                        </div>

                    </div>

                    ${asset.anomaly}

                </div>

            </td>

            <td>

                <span class="status ${statusClass}">

                    ${asset.status}

                </span>

            </td>

        `;


        table.appendChild(row);

    });

}


// ==========================================
// RENDER ALERTS
// ==========================================

function renderAlerts() {

    const container =
        document.getElementById("alertsList");

    container.innerHTML = "";


    alerts.forEach(alert => {

        const element =
            document.createElement("div");

        element.className =
            `alert ${alert.level}`;


        element.innerHTML = `

            <div class="alert-icon">
                ${alert.icon}
            </div>

            <div>

                <h4>
                    ${alert.title}
                </h4>

                <p>
                    ${alert.message}
                </p>

                <time>
                    ${alert.time}
                </time>

            </div>

        `;


        container.appendChild(element);

    });

}


// ==========================================
// UPDATE RISK
// ==========================================

function updateRisk(score) {

    const scoreElement =
        document.getElementById("riskScore");

    const statusElement =
        document.getElementById("riskStatus");

    const descriptionElement =
        document.getElementById("riskDescription");

    const bar =
        document.getElementById("riskBar");


    scoreElement.textContent = score;

    bar.style.width = `${score}%`;


    if (score >= 85) {

        statusElement.textContent =
            "CRITICAL RISK";

        statusElement.style.color =
            "#f06470";

        descriptionElement.textContent =
            "Coordinated high-risk activity requires immediate security response.";

    }

    else if (score >= 70) {

        statusElement.textContent =
            "ELEVATED RISK";

        statusElement.style.color =
            "#f2bd59";

        descriptionElement.textContent =
            "Multiple customer assets are displaying abnormal behavioural patterns.";

    }

    else {

        statusElement.textContent =
            "MODERATE RISK";

        statusElement.style.color =
            "#49b7f2";

        descriptionElement.textContent =
            "Some unusual activity is present and should be monitored.";

    }

}


// ==========================================
// SECURITY SCAN
// ==========================================

function runScan() {

    const button =
        document.querySelector(".primary-btn");

    const originalText =
        button.innerHTML;


    button.disabled = true;

    button.innerHTML =
        "◌ Scanning telemetry...";


    setTimeout(() => {

        // Generate new simulated values

        assets.forEach(asset => {

            if (asset.status === "SAFE") {

                asset.anomaly =
                    Math.floor(
                        Math.random() * 25
                    ) + 5;

            }

            else if (asset.status === "WATCH") {

                asset.anomaly =
                    Math.floor(
                        Math.random() * 20
                    ) + 50;

            }

            else {

                asset.anomaly =
                    Math.floor(
                        Math.random() * 8
                    ) + 88;

            }

        });


        // Simulated grid risk

        const risk =
            Math.floor(
                Math.random() * 16
            ) + 68;


        updateRisk(risk);

        renderAssets();


        // Add new alert

        alerts.unshift({

            level: "red",

            icon: "🚨",

            title: "Security scan completed",

            message:
                "Cross-asset behaviour analysis identified elevated activity.",

            time: "Just now"

        });


        if (alerts.length > 5) {

            alerts.pop();

        }


        renderAlerts();


        button.innerHTML =
            "✓ Scan Complete";


        showToast();


        setTimeout(() => {

            button.innerHTML =
                originalText;

            button.disabled = false;

        }, 2200);


    }, 1400);

}


// ==========================================
// REFRESH ASSETS
// ==========================================

function refreshAssets() {

    assets.forEach(asset => {

        if (asset.status !== "CRITICAL") {

            asset.anomaly =
                Math.max(
                    5,
                    Math.min(
                        75,
                        asset.anomaly +
                        Math.floor(
                            Math.random() * 15
                        ) - 7
                    )
                );

        }

    });


    renderAssets();

    showToast(
        "Telemetry Refreshed",
        "Latest simulated asset behaviour loaded."
    );

}


// ==========================================
// TOAST
// ==========================================

function showToast(
    title = "Security Scan Complete",
    message = "Behaviour analysis updated."
) {

    const toast =
        document.getElementById("toast");


    toast.querySelector("strong")
        .textContent = title;


    toast.querySelector("p")
        .textContent = message;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


// ==========================================
// SCROLL
// ==========================================

function scrollToSection(id) {

    const section =
        document.getElementById(id);

    if (section) {

        section.scrollIntoView({

            behavior: "smooth"

        });

    }

}


// ==========================================
// THEME TOGGLE
// ==========================================

function toggleTheme() {

    document.body.classList.toggle("light");

}


// ==========================================
// SIMULATED LIVE STATUS
// ==========================================

setInterval(() => {

    const indicator =
        document.querySelector(".live-status span");

    if (!indicator) {
        return;
    }


    indicator.style.opacity =
        indicator.style.opacity === "0.4"
            ? "1"
            : "0.4";

}, 900);


// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderAssets();

        renderAlerts();

        updateRisk(72);

    }
);
