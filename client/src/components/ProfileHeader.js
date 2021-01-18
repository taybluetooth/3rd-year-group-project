import React from 'react';

export default () => {

  return (
    <div class="overflow-hidden border w-full lg:w-6/12 md:w-6/12 mx-3 md:mx-0 lg:mx-0">
      <div class="w-full flex justify-between p-3">
        <div class="flex">
          <div class="rounded-full h-40 w-40 bg-gray-500 flex items-center justify-center overflow-hidden">
            <img src="https://avatars0.githubusercontent.com/u/39353470?s=460&u=c82cc7e746e25bdab580cdb83ec41dbb938a7d71&v=4" alt="profilepic"></img>
          </div>
          <div class="pt-4 ml-10">
            <span class="font-bold text-lg"> Username </span>
            <div class="grid grid-flow-col auto-cols-max gap-4 text-sm">
              <div><b>0</b> posts</div>
              <div><b>0</b> followers</div>
              <div><b>0</b> following</div>
            </div>
            <div class="pt-3 text-sm">
              <span class="font-bold"> Firstname </span>
              <br />
              <span> A basic description about the profile here. </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}
