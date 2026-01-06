import { useContext } from "react";
import styles from "./DisplayAlerts.module.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { AlertContext } from "../../context";
import Alert from "../Alert/Alert";
function DisplayAlerts() {
  const { alerts, removeAlert } = useContext(AlertContext);

  return (
    <div className={styles.alertsWrapper}>
      <div className={styles.stickyPosition}>
        <TransitionGroup>
          {alerts
            .slice()
            .reverse()
            .map((alert) => (
              <CSSTransition
                key={alert.id}
                nodeRef={alert.ref}
                timeout={400}
                appear
                classNames="alert"
              >
                <Alert
                  ref={alert.ref}
                  state={alert.state}
                  value={alert.value}
                  onClose={() => removeAlert(alert.id)}
                />
              </CSSTransition>
            ))}
        </TransitionGroup>
      </div>
    </div>
  );
}
export default DisplayAlerts;
