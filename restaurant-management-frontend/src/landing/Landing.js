import React, {Component} from 'react';
import Navigator from './Navigator';
class Landing extends Component {
    state={
        user : {
            id:''
        }
    }

    componentDidMount() {
        fetch("http://localhost:8002/api/v1/users/me", {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }).then(response => {
          if (!response.ok) {
            if (response.status == 401) {
              throw new Error("username and password not match")
            }
            else {
              throw new Error("Internal Server Error. Try again later")
            }
          }
          return response.json()
        }).then(response => {
          this.setState({
            user: response.result
          })
          console.log(response.result)
        }).catch((error) => {
          console.log(error.message)
          this.setState({
            response: error.message
          })
        })
      }

    render() {
        return (
            <div className="landing_page">
              <div>
                <Navigator user={this.state.user}  key={this.state.user.id}/>
              </div>
                {/* landing page which links to each display*/}
            </div>
        );
    }
}

export default Landing;
