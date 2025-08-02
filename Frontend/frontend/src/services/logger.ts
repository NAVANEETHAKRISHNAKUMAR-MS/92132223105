const AUTH_URL = "http://localhost:5000/evaluation-service/auth";
const LOGS_URL = "http://localhost:5000/evaluation-service/logs";

const authPayload = {
    email: "navaneenavanee512@gmail.com",
    name: "Navaneetha Krishna Kumar M S",
    rollNo: "92132223105",
    accessCode: "rBPfSS",
    clientID: "64fdaa52-87b9-4f98-be42-8bae6da8d422",
    clientSecret: "KaUZPrXxfkZzbQSj"
};

export async function log(stack: string, level: string, pkg: string, message: string): Promise<void> {
    try {
        const authRes = await fetch(AUTH_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(authPayload)
        });

        const authData = await authRes.json();
        const token = authData.access_token;

        const logPayload = { stack, level, package: pkg, message };

        const logRes = await fetch(LOGS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(logPayload)
        });

        const logData = await logRes.json();
        console.log("Log Created Successfully:", logData);

    } catch (err) {
        console.error("Logger Error:", err);
    }
}
