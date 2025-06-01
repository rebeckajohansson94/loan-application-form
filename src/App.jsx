import LoanForm from "./Components/LoanForm/LoanForm";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="wrapper">
      <main>
        <h1>React Bank</h1>
        <div className="container">
          <div className="empty-div"></div>
          <LoanForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
