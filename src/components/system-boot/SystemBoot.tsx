import React, { useCallback, useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import TypeIt from "../../components/typeit";
import {
  bootStageCompleted,
  connectUser,
  selectBootStage,
  selectSystemStatus,
  selectUsername,
} from "../../features/system/systemSlice";
import { getRandomInRange } from "../../util/helper";
import styles from "./SystemBoot.module.scss";

export const SystemBoot = () => {
  const dispatch = useAppDispatch();

  const username = useAppSelector(selectUsername);
  const status = useAppSelector(selectSystemStatus);
  const bootStage = useAppSelector(selectBootStage);

  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nameRef.current && bootStage === 1) {
      nameRef.current.focus();
    }
  }, [status, bootStage]);

  const onAnyKeyPress = useCallback(() => {
    dispatch(bootStageCompleted());
  }, [dispatch]);

  useEffect(() => {
    return () => document.removeEventListener("keydown", onAnyKeyPress);
  }, [onAnyKeyPress]);

  const handleNameSubmit = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      e.preventDefault();
      console.log(nameRef.current?.innerText);
      const name = nameRef.current?.innerText;
      if (name?.length) {
        dispatch(connectUser(name));
        dispatch(bootStageCompleted());
      }
    }
  };

  return (
    <>
      <TypeIt
        getBeforeInit={(instance) => {
          instance.type("Welcome to <strong>SleepDevSystems</strong><br />").pause(1000).type("Enter your name: ").go();

          return instance;
        }}
        options={{
          afterComplete: async () => {
            dispatch(bootStageCompleted());
          },
          startDelay: 1000,
          cursor: false,
        }}
      />

      {bootStage > 0 ? (
        <div ref={nameRef} onKeyDown={handleNameSubmit} contentEditable className={styles.nameInput}></div>
      ) : (
        <></>
      )}
      {username && username.length && bootStage > 1 ? (
        <>
          <br />
          <br />
          <TypeIt
            getBeforeInit={(instance) => {
              instance
                .type("Starting boot sequence")
                .pause(getRandomInRange(2800, 3200))
                .type("<br />Initializing memory")
                .pause(getRandomInRange(2000, 2500))
                .type("<br />Found 1 App(s) installed<br /> - <strong>Portfolio</strong>")
                .pause(300)
                .type("<br /><br />Starting <strong>SleepingOS</strong><br />")
                .pause(getRandomInRange(700, 1300))
                .type("Configuring files")
                .pause(getRandomInRange(2200, 3000))
                .type(`<br /><br />1 User connected - <strong>${username}</strong>`)
                .pause(300)
                .type("<br /><br />Press any key to continue...")
                .go();
              return instance;
            }}
            options={{
              afterComplete: () => {
                document.addEventListener("keydown", onAnyKeyPress);
              },
              startDelay: 1000,
              cursor: false,
              html: true,
            }}
          />
        </>
      ) : (
        <></>
      )}
      {bootStage > 2 ? (
        <>
          <br />
          <br />
          <span>
            Initiating <span className={styles.terminalSpinner}></span>
          </span>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
