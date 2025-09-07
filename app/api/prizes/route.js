// This is a mock API route for Next.js
// In a real application, you would connect to your database

export async function GET() {
  // Simulate database fetch
  const prizes = [
    { id: 1, multiplier: "x2" },
    { id: 2, multiplier: "x3" },
    { id: 3, multiplier: "x5" },
    { id: 4, multiplier: "x1" },
    { id: 5, multiplier: "x10" },
    { id: 6, multiplier: "x4" },
  ]

  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return Response.json(prizes)
}
