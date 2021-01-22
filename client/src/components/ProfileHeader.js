import React from 'react';
import axios from 'axios';
import { getToken } from "../utils/Common";

export default class ProfileHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    const token = getToken();
    axios.get(`/api/user/${token}`)
      .then(res => {
        const users = res.data;
        console.log(users);
        this.setState({users});
      })
  }

  render() {
    return (
      <div className="overflow-hidden border w-full lg:w-6/12 md:w-6/12 mx-3 md:mx-0 lg:mx-0">
        <div className="w-full flex justify-between p-3">
          <div className="flex">
            <div className="rounded-full h-40 w-40 bg-gray-500 flex items-center justify-center overflow-hidden">
              <img src="https://avatars0.githubusercontent.com/u/39353470?s=460&u=c82cc7e746e25bdab580cdb83ec41dbb938a7d71&v=4" alt="profilepic"></img>
            </div>
            <div className="pt-4 ml-10">
              <div className="grid grid-flow-col auto-cols-max gap-4 text-sm">
                <div><b>0</b> posts</div>
                <div><b>0</b> followers</div>
                <div><b>0</b> following</div>
              </div>
              <div className="pt-3 text-sm">
                <span className="font-bold"> Firstname </span>
                <br />
                <span> A basic description about the profile here. </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
