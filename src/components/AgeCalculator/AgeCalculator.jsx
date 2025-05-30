import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Images
import bgImage from "../../assets/background.jpg";

// React Toastify
import { toast } from "react-toastify";

const AgeCalculator = () => {
  const [birthday, setBirthday] = useState("");
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const calculateAge = async () => {
    if (!birthday) {
      toast.error("Please select your date of birth");
      return;
    }

    const birthdate = new Date(birthday);
    const today = new Date();

    if (birthdate > today) {
      toast.error("Please select a correct birth date");
    }

    setLoading(true);
    let years = today.getFullYear() - birthdate.getFullYear();
    let months = today.getMonth() - birthdate.getMonth();
    let days = today.getDate() - birthdate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      console.log(prevMonth.getDate(), "prevMonth");
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setAge({ years, months, days });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setBirthday("");
    setLoading(false);
  };


  const handleSeeEverything = () => {
    if (age.years === 0 && age.months === 0 && age.days === 0) {   
        toast.error("Please select your date of birth");
        return;
    }

    navigate(`/details?birthday=${birthday}&years=${age.years}&months=${age.months}&days=${age.days}`);

  }


  return (
    <div
      className="relative bg-cover bg-center h-[100vh] w-full"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay*/}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full flex-col">
        <h1 className="text-white text-[50px] lg:text-[40px] font-bold text-center">
        ⌛Age Calculator
        </h1>
        <div className="mt-8 flex justify-center items-center flex-col w-[100%] md:w-[60%] p-[3rem] text-white">
          <div className="flex justify-center items-center flex-col md:flex-row w-[100%] p-4 gap-4  ">
            <div className="w-[100%]">
              <input
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                type="date"
                className="w-full p-[16px] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 bg-white"
              />
            </div>
            <button
              disabled={loading}
              onClick={calculateAge}
              class="w-[100%] bg-transparent hover:bg-pink-400 text-pink-400 font-semibold hover:text-black cursor-pointer px-4 border border-pink-400 hover:border-transparent rounded-lg py-[14px]"
            >
              {loading ? "Processing..." : "Continue"}
            </button>
          </div>
          <h3 className="mt-[8rem] mb-6 text-center text-pink-400 text-[1.1rem] font-bold italic">
          🕰️ Your age till today is:
          </h3>
          {loading ? (
            <div className="flex justify-center items-center py-[1.8rem]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400"></div>
              <span className="ml-4 text-pink-400">Processing your age...</span>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-8">
              <div className="flex justify-center items-center gap-2 flex-col">
                <div className="min-w-[60px] max-h-[60px] md:min-w-[80px] md:max-h-[80px]  rounded bg-pink-400 text-gray-800 shadow-lg flex justify-center items-center font-bold text-[2rem] md:text-[3rem] ">
                  {age.years}
                </div>
                <p>Years</p>
              </div>
              <div className="flex justify-center items-center gap-2 flex-col">
                <div className="min-w-[60px] max-h-[60px] md:min-w-[80px] md:max-h-[80px]  rounded bg-pink-400 text-gray-800 shadow-lg flex justify-center items-center font-bold text-[2rem] md:text-[3rem] ">
                  {age.months}
                </div>
                <p>Months</p>
              </div>
              <div className="flex justify-center items-center gap-2 flex-col">
                <div className="min-w-[60px] max-h-[60px] md:min-w-[80px] md:max-h-[80px]  rounded bg-pink-400 text-gray-800 shadow-lg flex justify-center items-center font-bold text-[2rem] md:text-[3rem] ">
                  {age.days}
                </div>
                <p>Days</p>
              </div>
            </div>     
          )}
        </div>
      </div>
    </div>
  );
};

export default AgeCalculator;
