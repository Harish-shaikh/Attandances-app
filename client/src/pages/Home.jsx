import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-center gap-20 p-24">
        <div>
          <h1 className="text-7xl font-bold">
            Your{" "}
            <span className="underline decoration-wavy decoration-primary">
              Attendance
            </span>
          </h1>
        </div>
        <div className="mb-32 grid text-center lg:max-w-2xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left">
          <Link
            to="/register"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Register
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Start marking your attendance
            </p>
            <p className="m-0 max-w-[30ch] text-sm opacity-50 underline">
              Register Now!
            </p>
          </Link>
          <Link
            to="/login"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Login
              {/* */}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50 text-balance">
              Already Registered?
            </p>
            <p className="m-0 max-w-[30ch] text-sm opacity-50 text-balance underline">
              Login Now!
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
