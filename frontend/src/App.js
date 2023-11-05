import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { ContractsPage } from './pages/Contracts';
import { JobsPage } from './pages/Jobs';
import { BalancePage } from './pages/Balance';
import { AdminPage } from './pages/Admin';
import { styles } from './styles';

// shortcut: in a real app we would have an authentication flow
localStorage.setItem('profile_id', 1);

function App() {
  return (
    <Router>
      <div style={styles.container}>
        <div style={styles.header}>
          <nav style={styles.nav}>
            <Link to='/contracts' style={styles.navLink}>
              Contracts
            </Link>
            <Link to='/jobs' style={styles.navLink}>
              Jobs
            </Link>
            <Link to='/balance' style={styles.navLink}>
              Balance
            </Link>
            <Link to='/admin' style={styles.navLink}>
              Admin
            </Link>
          </nav>
        </div>
        <Route exact path='/' render={() => <Redirect to='/contracts' />} />
        <Route path='/contracts' component={ContractsPage} />
        <Route path='/jobs' component={JobsPage} />
        <Route path='/balance' component={BalancePage} />
        {/* shortcut: in a production admin's would have to pass additional authorization */}
        <Route path='/admin' component={AdminPage} />
      </div>
    </Router>
  );
}

export default App;
