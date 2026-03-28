import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import LoginSchemaValidation from "#/modules/validation/auth/login";

export function FieldInfo({ state }: any) {
  return (
    <>
      {state.meta.isTouched && !state.meta.isValid ? (
        <em className="text-red-500 text-sm">
          {state.meta.errors?.[0]?.message}
        </em>
      ) : null}
    </>
  );
}

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: LoginSchemaValidation,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div className="w-full lg:w-2/5 flex items-center justify-center p-8 sm:p-12 lg:p-20 bg-white dark:bg-zinc-950">
      <div className="w-full max-w-md space-y-4">
        {/* Header */}
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Clariva
          </h1>
          <p className="mb-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Safes Hires, Smarter Workflows
          </p>
          <p className="text-base text-zinc-500 dark:text-zinc-400">
            Build your workflows effortlessly with our powerful workflow
            builder.
          </p>
        </div>

        {/* Social Login */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all active:scale-[0.98] font-semibold text-zinc-700 dark:text-zinc-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <title>Google</title>
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-sm uppercase">
            <span className="bg-white dark:bg-zinc-950 px-4 text-zinc-500 font-bold tracking-widest text-[10px]">
              Or
            </span>
          </div>
        </div>
        {/* Form */}
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            void form.handleSubmit();
          }}
        >
          <div className="space-y-4">
            <div className="space-y-2 group">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 group-focus-within:text-indigo-600 transition-colors"
                >
                  Email
                </label>
              </div>
              <div className="relative">
                <form.Field name="email">
                  {({ state, handleBlur, handleChange }) => (
                    <>
                      <input
                        value={state.value}
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(e.target.value)}
                        id="email"
                        type="email"
                        placeholder="zed@email.com"
                        className="w-full px-4 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900 focus:bg-white dark:focus:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                      />
                      <FieldInfo state={state} />
                    </>
                  )}
                </form.Field>
              </div>
            </div>

            <div className="space-y-2 group">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 group-focus-within:text-indigo-600 transition-colors"
                >
                  Password
                </label>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <form.Field name="password">
                  {({ state, handleBlur, handleChange }) => (
                    <>
                      <input
                        value={state.value}
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(e.target.value)}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••••"
                        className="w-full px-4 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900 focus:bg-white dark:focus:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-3.5 top-1/2 ${state.meta.errors.length > 0 ? "-translate-y-2/2" : "-translate-y-1/2"} text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors`}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                      <FieldInfo state={state} />
                    </>
                  )}
                </form.Field>
              </div>
            </div>
          </div>

          {/* Remember Me Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setRememberMe(!rememberMe)}
              className={`group relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 ${
                rememberMe ? "bg-indigo-600" : "bg-zinc-200 dark:bg-zinc-800"
              }`}
            >
              <span className="sr-only">Remember me</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
                  rememberMe ? "translate-x-[1.625rem]" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Remember sign in details
            </span>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-6 text-lg font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98]"
          >
            Log in
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 font-medium">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-bold transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Form;
