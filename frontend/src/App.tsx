import PatientList from './components/PatientList';
import './styles/global.css';
import styles from './App.module.css';

function App() {
  return (
    <main>
      <header className={styles.header}>
        <h1>Patient Registry</h1>
        <button className={styles.addButton}>+ Add Patient</button>
      </header>
      <PatientList />
    </main>
  );
}

export default App;