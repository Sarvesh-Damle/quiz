import { useContext } from "react";
import { GamestateContext } from "./Quiz_Helpers/Contexts";
import useAxios from "../../hooks/useAxios";
import { Loader, Placeholder, Message } from "rsuite";
import { useDispatch } from "react-redux";
import {
  handleAmountChange,
  handleCategoryChange,
  handleDifficultyChange,
  handleTypeChange,
} from "../../redux/actions";
// import { useNavigate } from "react-router-dom";

const Options = (props) => {
  const { value, options } = props;
  const dispatch = useDispatch();
  const handleChange = (e) => {
    switch (value) {
      case "Category":
        dispatch(handleCategoryChange(e.target.value));
        break;
      case "Difficulty":
        dispatch(handleDifficultyChange(e.target.value));
        break;
      case "Type":
        dispatch(handleTypeChange(e.target.value));
        break;

      default:
        break;
    }
  };
  return (
    <select
      name="box"
      className="w-1/2 h-12 m-1 my-2 rounded-lg text-center text-lg"
      onChange={handleChange}
    >
      <option hidden>{value}</option>
      {options.map(({ id, name }) => (
        <option value={id} key={id}>
          {name}
        </option>
      ))}
    </select>
  );
};

const Menu = () => {
  const { setGamestate, username, setUsername } = useContext(GamestateContext);
  const { response, error, loading } = useAxios({ url: "/api_category.php" });
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  if (loading) {
    return (
      <div>
        <Placeholder.Paragraph rows={8} />
        <Loader center content="loading" />
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <Message showIcon type="error" header="Error">
          Oops!! Something Went Wrong!
        </Message>
      </div>
    );
  }

  const difficultyOptions = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  const typeOptions = [
    { id: "multiple", name: "Multiple Choice" },
    { id: "boolean", name: "True/False" },
  ];

  const handleSubmit = (e) => {
    // e.preventDefault();
    // navigate("/questions");
  };

  const handleQuestions = (e) => {
    dispatch(handleAmountChange(e.target.value));
  };

  return (
    <div className="w-1/2 h-1/2 bg-blue-300 rounded-lg flex flex-col justify-center items-center m-3 p-2">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col justify-center items-center"
      >
        <label>
          <h2 className="text-center font-bold text-2xl">Enter your Name: </h2>
        </label>
        <input
          type="text"
          placeholder="Your Name..."
          minLength={3}
          maxLength={15}
          value={username}
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          className="w-1/2 h-12 m-1 my-2 rounded-lg text-center text-lg text-gray-900 shadow-sm bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-1"
        />
        <Options value="Category" options={response.trivia_categories} />
        <Options value="Difficulty" options={difficultyOptions} />
        <Options value="Type" options={typeOptions} />
        <input
          type="number"
          placeholder="Enter Number of Questions..."
          onChange={handleQuestions}
          max={20}
          className="w-1/2 h-12 m-1 my-2 rounded-lg text-center text-lg text-gray-900 shadow-sm bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-1"
        />
        <button
          type="submit"
          onClick={() => setGamestate("questions")}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-5 py-2.5 text-center m-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Start Quiz
        </button>
      </form>
    </div>
  );
};
export default Menu;
