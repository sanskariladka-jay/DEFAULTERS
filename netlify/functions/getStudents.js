// Mock database (replace with actual database if needed)
const students = [
  { id: 1, name: "Jay Kumar", defaulter: true },
  { id: 2, name: "Urbi Kumari", defaulter: false },
];

export async function handler(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify(students),
  };
}