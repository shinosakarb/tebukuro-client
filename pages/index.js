// @flow
import React from "react";
import Head from "next/head";
import Button from "@material/react-button";
import TopAppBar from "@material/react-top-app-bar";
import MaterialIcon from "@material/react-material-icon";
import UserInfo from "../components/UserInfo";
import "../styles/style.css";

export default () => (
  <div>
    <Head>
      <link rel="stylesheet" href="/_next/static/style.css" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Rubik:300,400,500"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto+Mono"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
      />
    </Head>
    <TopAppBar
      title="Tebukuro"
      navigationIcon={<MaterialIcon icon="thumb_up" />}
      actionItems={[<UserInfo />]}
    />
    <div className="mdc-top-app-bar--fixed-adjust home-component">
      <h1 className="mdc-typography--headline2">Welcome to Tebukuro</h1>

      <div className="home-list">
        <ul class="mdc-list" aria-orientation="vertical">
          <li class="mdc-list-item">
            <Button href="event/new">
              <h1 className="mdc-typography--headline6">Create a new event</h1>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  </div>
);
