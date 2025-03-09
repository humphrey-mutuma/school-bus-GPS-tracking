export async function extractEmailFromToken(
  token: string
): Promise<string | null> {
  try {
    // Split the JWT and decode the payload
    const payloadBase64 = token.split(".")[1]; // JWT format: header.payload.signature
    const payloadDecoded = JSON.parse(atob(payloadBase64)); // Decode Base64 to JSON

    // Return the email if it exists
    return payloadDecoded.email || null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

 