# Weather Retrieval API

## 📌 Objective
This project is a simple backend service that retrieves weather data from a public API and exposes it through custom endpoints.

It also includes **automated tests** to validate API behavior and responses.

---

## 🧪 Testing Scope

### API Testing
- Status code validation
- Response structure validation
- Data consistency checks
- Error handling scenarios

---

## 🔍 Example Validations
- 200 response for valid requests
- Error handling for invalid city names
- Response structure matches expected format

---

## 🛠 Tech Stack
- Node.js
- JavaScript
- Jest (testing)
- External Weather API

---

## ▶️ How to Run

```bash
npm install
npm start
```
Run tests:
```bash
npm test
```
> [!WARNING]
>  🔐 API Key Note
> 
> This project uses a public API key directly in the code for simplicity.
> 
> ⚠️ In a real production environment:
> 
> The API key should be stored in a .env file
> 
> It should never be exposed in the codebase
> 
> Example:
>
> 
> API_KEY=your_key_here

This project keeps it simple as it is intended for learning and testing purposes only.

