export const getCustomers = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/customers');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
}