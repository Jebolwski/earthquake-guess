import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { register }: any = useContext(AuthContext);

  return (
    <div className="bg-[#686279] font-opensans h-full flex justify-center items-center p-4">
      <div className="flex items-center bg-[#2c2638] border border-[#262031] text-white shadow-md hover:shadow-lg duration-200 rounded-lg w-fit">
        <div className="flex">
          <div className="rounded-lg p-4">
            <img
              src="https://wallpapersok.com/images/hd/dark-purple-city-view-8v7bayl3lciusuos.jpg"
              className="rounded-lg w-96 h-full object-cover"
            />
          </div>
          <div className="p-8 px-10">
            <p className="text-3xl">Create an account</p>
            <div className="my-4">
              <div className="flex text-sm gap-2">
                <p className="text-gray-300">Already have an account?</p>
                <p className="text-[#968cb6] underline">Login</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder="First name"
                  className="focus:outline-0 bg-[#3c364c] focus:shadow-lg w-full shadow-md duration-200 px-3 py-2 focus:border-[#676282] text-sm text-gray-100 rounded-md border-2 border-[#332d41]"
                />
                <input
                  type="text"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder="Last name"
                  className="focus:outline-0 bg-[#3c364c] focus:shadow-lg w-full shadow-md duration-200 px-3 py-2 focus:border-[#676282] text-sm text-gray-100 rounded-md border-2 border-[#332d41]"
                />
              </div>
            </div>
            <div className="mt-4">
              <input
                type="text"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="Email"
                className="focus:outline-0 bg-[#3c364c] focus:shadow-lg w-full shadow-md duration-200 px-3 py-2 focus:border-[#676282] text-sm text-gray-100 rounded-md border-2 border-[#332d41]"
              />
            </div>
            <div className="mt-4">
              <input
                type="text"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="Enter your password"
                className="focus:outline-0 bg-[#3c364c] focus:shadow-lg w-full shadow-md duration-200 px-3 py-2 focus:border-[#676282] text-sm text-gray-100 rounded-md border-2 border-[#332d41]"
              />
            </div>
            <button
              className="bg-[#6d54b5] mt-4 cursor-pointer text-white hover:shadow-lg shadow-md duration-200 px-4 rounded-md border border-[#614b9f] py-2 px-2 mt-2 w-full"
              onClick={() => {
                register({ username, password });
              }}
            >
              Create Account
            </button>
            <div className="flex items-center gap-3 mt-4">
              <div className="h-[2px] w-full bg-[#454150]"></div>
              <p className="text-[#706b7c] text-sm w-fit text-nowrap">
                Or register with
              </p>
              <div className="h-[2px] w-full bg-[#454150]"></div>
            </div>
            <div className="mt-4">
              <div className="flex gap-3">
                <button className="bg-[#2c2638] w-full p-2 border-[1px] border-[#656072] rounded-lg">
                  <div className="flex items-center justify-center gap-3">
                    <img
                      src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png"
                      alt="Google icon"
                      className="w-7"
                    />
                    <p>Google</p>
                  </div>
                </button>
                <button className="bg-[#2c2638] w-full p-2 border-[1px] border-[#656072] rounded-lg">
                  <div className="flex items-center justify-center gap-3">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/1724px-Apple_logo_white.svg.png"
                      alt="Google icon"
                      className="w-6"
                    />
                    <p>Apple</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
