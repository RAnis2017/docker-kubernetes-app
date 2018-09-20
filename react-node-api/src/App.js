import React, { Component } from "react";
import Login from "./components/Login";
import GetCard from "./components/GetCard";
import Admin from "./components/Admin";
import Members from "./components/Members";
import MemberNav from "./components/Members/MemberNav";
import Profile from "./components/Members/MemberProfile";
import Referral from "./components/Members/MemberReferrals";
import Contact from "./components/Members/MemberContact";
import Lounge from "./components/Members/MemberTheLounge";
import Perks from "./components/Members/Perks";

import md5 from "md5";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import axios from "axios";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { update } from "immutability-helper";
class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.apiUrl = `http://${process.env.REACT_APP_API_URL}:3001/`;
    this.state = {
      appTitle: "Select Lagos",
      username: "",
      password: "",
      memberEmail: "",
      passwordUnmatch: "",
      infoSaveStatus: "Save Information",
      currentUser: {},
      isTyping: false,
      loggedIn: 0,
      failedLogin: false,
      members: [],
      files: [],
      sendfiles: [],
      getcardname: "",
      getcardemail: "",
      getcardoccupation: "",
      getcardrationale: "",
      getcardredirect: 0,
      memberName: "",
      memberEmail: ""
    };
  }
  setTheCurrentUser = response => {
    if (response.data.success === "1") {
      console.log("GOT HERE");
      this.setState({
        failedLogin: false,
        loggedIn: parseInt(response.data.role),
        currentUser: response.data.user[0]
      });
      this.state.currentUser.id = this.state.currentUser._id;
      this.setState(this.state);
    } else {
      this.setState({
        failedLogin: true
      });
    }
  };
  getMembers = (success, role) => {
    if (success === "1") {
      this.setState({
        failedLogin: false,
        loggedIn: role
      });
      axios
        .post(`${this.apiUrl}users`, {
          data: localStorage.getItem("selectlagosapiauth")
        })
        .then(response => {
          response.data = JSON.parse(response.data);
          this.setState({
            members: response.data.users
          });
          this.state.members.map(member => {
            member.isEditting = false;
            member.status = parseInt(member.status);
            member.id = member._id;
          });
          this.setState(this.state.members);
        });
    } else {
      this.setState({
        failedLogin: true
      });
    }
  };
  componentWillMount() {
    axios
      .post(`${this.apiUrl}authenticate`, {
        data: localStorage.getItem("selectlagosapiauth")
      })
      .then(response => {
        response.data = JSON.parse(response.data);
        this.getMembers(response.data.success, response.data.role);
        this.setTheCurrentUser(response);
        this.setState({
          username: "",
          password: "",
          memberName: `${this.state.currentUser.first_name} ${
            this.state.currentUser.last_name
          }`,
          memberEmail: this.state.currentUser.email
        });
      });
  }
  getMembersLength = () => this.state.members.length;
  handleFieldChange = (e, field) => {
    if (e.target.value.length > 0 && field === "memberEmail") {
      this.setState({
        isTyping: true
      });
    } else {
      this.setState({
        isTyping: false
      });
    }
    this.setState({
      [field]: e.target.value
    });
  };
  handleGetCardFieldChange = (e, field) => {
    this.setState({
      [field]: e.target.value
    });
  };
  handleUsernameChange = e => {
    this.handleFieldChange(e, "username");
  };
  handlePassChange = e => {
    this.handleFieldChange(e, "password");
  };
  handleMemberEmailChange = e => {
    this.handleFieldChange(e, "memberEmail");
  };
  handleEditEmailChange = (e, id) => {
    e.preventDefault();
    this.state.members.map(member => {
      if (member.id === id) {
        member.email = e.target.value;
      }
    });
    this.setState(this.state.members);
  };
  handleAddMember = e => {
    e.preventDefault();
    axios
      .post(`${this.apiUrl}add`, {
        data: JSON.stringify({
          email: this.state.memberEmail,
          token: localStorage.getItem("selectlagosapiauth")
        })
      })
      .then(response => {
        console.log(response);
        response.data = JSON.parse(response.data);
        this.getMembers(response.data.success, this.state.loggedIn);
      });
    // this.totalMembers += 1;
    // let t = new Date(); // Epoch
    // t = t.toDateString();
    // this.setState(()=>{
    //     this.state.members.push({
    //     id: this.totalMembers,
    //     email: this.state.memberEmail,
    //     dateAdded: `${t}`,
    //     status: "New",
    //     isEditting: false
    //   })
    //   return this.state;
    // });
    this.setState({
      memberEmail: "",
      isTyping: false
    });
    return false;
  };
  handleDeleteMember = (e, id) => {
    e.preventDefault();
    const memberDeleting = this.state.members.filter(
      member => member.id === id
    )[0];
    axios
      .post(`${this.apiUrl}delete`, {
        data: JSON.stringify({
          id: id,
          rev: memberDeleting._rev,
          token: localStorage.getItem("selectlagosapiauth")
        })
      })
      .then(response => {
        console.log(response);
        response.data = JSON.parse(response.data);
        this.getMembers(response.data.success, this.state.loggedIn);
      });
  };
  handleEditMember = (e, id, email) => {
    e.preventDefault();
    let isEditting;
    let currentEmail;
    const memberEditing = this.state.members.filter(
      member => member.id === id
    )[0];
    this.state.members.map(member => {
      if (member.id === id) {
        member.isEditting = !member.isEditting;
        isEditting = member.isEditting;
        currentEmail = member.email;
      }
    });
    this.setState(this.state.members);
    if (isEditting === false) {
      axios
        .post(`${this.apiUrl}edit`, {
          data: JSON.stringify({
            id: id,
            email: currentEmail,
            member: memberEditing,
            token: localStorage.getItem("selectlagosapiauth")
          })
        })
        .then(response => {
          console.log(response);
          response.data = JSON.parse(response.data);
          this.getMembers(response.data.success, this.state.loggedIn);
        });
    }
  };
  handleMemberFieldChange = (e, field) => {
    e.preventDefault();
    this.state.currentUser[field] = e.target.value;
    if (
      this.state.currentUser.old_password != null &&
      this.state.currentUser.new_password != null
    ) {
      if (
        md5(this.state.currentUser.old_password) ===
        this.state.currentUser.password
      ) {
        this.state.passwordUnmatch = 0;
      } else {
        this.state.passwordUnmatch = 1;
      }
    }
    this.setState(this.state);
  };
  handleEmail = (e, id) => {
    e.preventDefault();
    let plain;
    let currentEmail;
    const memberEmail = this.state.members.filter(
      member => member.id === id
    )[0];
    this.state.members.map(member => {
      if (member.id === id) {
        plain = member.plain;
        currentEmail = member.email;
      }
    });
    axios
      .post(`${this.apiUrl}sendemail`, {
        data: JSON.stringify({
          id: id,
          email: currentEmail,
          password_text: plain,
          member: memberEmail,
          token: localStorage.getItem("selectlagosapiauth")
        })
      })
      .then(response => {
        console.log(response);
        response.data = JSON.parse(response.data);
        this.getMembers(response.data.success, this.state.loggedIn);
      });
  };
  handleSignOut = e => {
    e.preventDefault();
    localStorage.removeItem("selectlagosapiauth");
    this.setState({
      failedLogin: false,
      loggedIn: 0
    });
    window.location.replace(window.location.origin);
  };
  handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`${this.apiUrl}login`, {
        data: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      })
      .then(response => {
        response.data = JSON.parse(response.data);
        this.setTheCurrentUser(response);
        localStorage.setItem("selectlagosapiauth", response.data.token);
        this.setState({
          username: "",
          password: "",
          memberName: `${this.state.currentUser.first_name} ${
            this.state.currentUser.last_name
          }`,
          memberEmail: this.state.currentUser.email
        });
      });
  };
  handleGetCardFormSubmit = e => {
    e.preventDefault();
    axios
      .post(`${this.apiUrl}selectlagosapi/public/getcard`, {
        data: JSON.stringify({
          getcardname: this.state.getcardname,
          getcardemail: this.state.getcardemail,
          getcardoccupation: this.state.getcardoccupation,
          getcardrationale: this.state.getcardrationale,
          files: this.state.sendfiles
        })
      })
      .then(response => {
        console.log(response);
        if (response.data.success === "1") {
          this.setState({
            getcardredirect: 1
          });
        }
      });
  };
  onDrop = acceptedFiles => {
    acceptedFiles.forEach(file => {
      this.state.files.push(file);
      const reader = new FileReader();
      reader.onload = () => {
        const fileAsBinaryString = reader.result;
        // do whatever you want with the file content
        // let file = btoa(unescape(encodeURIComponent(fileAsBinaryString)));
        this.state.sendfiles.push(fileAsBinaryString);
      };
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");

      reader.readAsDataURL(file);
    });
    this.setState(this.state);
  };
  handleMemberFormSubmit = e => {
    e.preventDefault();
    if (this.state.passwordUnmatch === 0 || this.state.passwordUnmatch === "") {
      let passwordChangedBit = "0";
      if (this.state.currentUser.new_password) {
        if (this.state.currentUser.new_password.length > 0) {
          passwordChangedBit = "1";
        }
      }
      axios
        .post(`${this.apiUrl}profile`, {
          data: JSON.stringify({
            id: this.state.currentUser.id,
            member: this.state.currentUser,
            new_password: this.state.currentUser.new_password,
            passwordChangedBit: passwordChangedBit,
            token: localStorage.getItem("selectlagosapiauth")
          })
        })
        .then(response => {
          console.log(response);
          response.data = JSON.parse(response.data);
          this.setState({
            infoSaveStatus: "Saved"
          });
        });
    }
  };
  render() {
    const LoginPage = props => {
      return (
        <Login
          title={this.state.appTitle}
          username={this.state.username}
          password={this.state.password}
          handleUsernameChange={this.handleUsernameChange}
          handlePassChange={this.handlePassChange}
          handleSubmit={this.handleSubmit}
          failedLogin={this.state.failedLogin}
          shouldgetcard={this.state.getcardredirect}
          {...props}
        />
      );
    };
    const GetCardPage = props => {
      return (
        <GetCard
          files={this.state.files}
          name={this.state.getcardname}
          email={this.state.getcardemail}
          occupation={this.state.getcardoccupation}
          rationale={this.state.getcardrationale}
          handleGetCardFieldChange={this.handleGetCardFieldChange}
          handleGetCardFormSubmit={this.handleGetCardFormSubmit}
          onDrop={this.onDrop}
          {...props}
        />
      );
    };
    const MembersPage = props => {
      return <Members {...props} />;
    };
    const MemberProfile = props => {
      return (
        <Profile
          user={this.state.currentUser}
          passwordUnmatch={this.state.passwordUnmatch}
          handleMemberFieldChange={this.handleMemberFieldChange}
          handleMemberFormSubmit={this.handleMemberFormSubmit}
          infoSaveStatus={this.state.infoSaveStatus}
          {...props}
        />
      );
    };
    const MemberReferral = props => {
      return <Referral user={this.state.currentUser} {...props} />;
    };
    const MemberContact = props => {
      return <Contact user={this.state.currentUser} {...props} />;
    };
    const MemberTheLounge = props => {
      return <Lounge {...props} />;
    };
    const MemberPerks = props => {
      return (
        <Perks
          memberName={this.state.memberName}
          memberEmail={this.state.memberEmail}
          {...props}
        />
      );
    };
    const AdminPage = props => {
      return (
        <Admin
          title={this.state.appTitle}
          members={this.state.members}
          memberEmail={this.state.memberEmail}
          handleMemberEmailChange={this.handleMemberEmailChange}
          handleAddMember={this.handleAddMember}
          handleDeleteMember={this.handleDeleteMember}
          handleEditMember={this.handleEditMember}
          handleSignOut={this.handleSignOut}
          isTyping={this.state.isTyping}
          isAdmin={this.state.loggedIn}
          handleEditEmailChange={this.handleEditEmailChange}
          getMembers={this.getMembers}
          handleEmail={this.handleEmail}
          {...props}
        />
      );
    };
    const routes = () => {
      if (this.state.loggedIn === 1) {
        return (
          <div className="app">
            <Route exact path="/" render={AdminPage} />
          </div>
        );
      } else if (this.state.loggedIn === 2) {
        return (
          <div className="app">
            <div className="MemberApp">
              <div className="mask">
                <MemberNav handleSignOut={this.handleSignOut} />
                <Route exact path="/" render={MemberTheLounge} />
                <Route path="/profile" render={MemberProfile} />
                <Route path="/referrals" render={MemberReferral} />
                <Route path="/contact" render={MemberContact} />
                <Route path="/perks/:perkname" render={MemberPerks} />
              </div>
            </div>
          </div>
        );
      } else if (this.state.loggedIn === 0) {
        return (
          <div className="app">
            <Route exact path="/" render={LoginPage} />
          </div>
        );
      } else {
        return <Redirect path="/" />;
      }
    };
    return (<BrowserRouter>
            {routes()}
           </BrowserRouter>);
  }
}

export default App;

