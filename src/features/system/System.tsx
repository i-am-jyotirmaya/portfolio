import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { SystemBoot } from "../../components/system-boot/SystemBoot";
import { SystemPreboot } from "../../components/system-preboot/SystemPreboot";
import styles from "./System.module.scss";
import { didLoad, selectBootStage, selectSystemLoading, selectSystemStatus } from "./systemSlice";

export const System = () => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(selectSystemStatus);
  const loading = useAppSelector(selectSystemLoading);
  const bootStage = useAppSelector(selectBootStage);

  // Show fake loading screen to simulate terminal loading
  useEffect(() => {
    setTimeout(() => dispatch(didLoad()), 1000);
  }, [dispatch]);

  const getSystemJsx = (systemStatus: "preboot" | "boot" | "welcome" | "idle" | "shuttingdown") => {
    switch (systemStatus) {
      case "preboot":
        return <SystemPreboot />;
      case "boot":
        return <SystemBoot />;
      case "welcome":
        break;
      case "idle":
        break;
      case "shuttingdown":
        break;
      default:
        break;
    }
  };

  const showCustomCursor = (): boolean => status === "boot" && bootStage !== 3;

  return (
    <main className={`${styles.terminal} ${styles.scanlines}`}>
      {loading ? (
        <>Loading {<span className={styles.terminalSpinner}></span>}</>
      ) : (
        <div show-cursor={showCustomCursor() ? "_" : ""} className={styles.terminalText}>
          {getSystemJsx(status)}
        </div>
      )}
    </main>
  );
};
