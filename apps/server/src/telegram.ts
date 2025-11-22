export async function sendMessage(text: string) {
  const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;
  const body = JSON.stringify({
    chat_id: process.env.ADMIN_USER_ID,
    text,
    parse_mode: "HTML",
  });

  const res = await fetch(url, {
    body,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
