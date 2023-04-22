import { FormButton, Input, Link } from "components/index.ts";

type Props = {
  mode: "In" | "Up";
  errLogin : string | null;
  user : any | null;
};

export default function AuthForm({ mode, errLogin, user }: Props) {
  const signIn = {
    title: "Login",
    href: "/login",
    text: "Have an account?",
  };

  const signUp = {
    title: "Create account",
    href: "/api/sign-up",
    text: "No account?",
  };

  const buttProps = mode == "In" ? signIn : signUp;
  const footProps = mode == "In" ? signUp : signIn;

  return (
    <div class="items-stretch min-w-0">
      <div class="flex justify-center">
        <h2 class="my-4">{buttProps.title}</h2>
      </div>

      <form method="post" class="flex flex-col space-y-4 min-w-0">
        <Input
          autofocus
          type="email"
          name="email"
          value={user?.email}
        />
        <Input
          type="password"
          name="password"
          value={user?.password}
        />

        {errLogin && <span   class={`text-error`}>{errLogin}</span>}

        <FormButton
          type="submit"
          //formAction={"/api" + buttProps.href}
          formAction={buttProps.href}
          class="!mt-8"
        >
          {buttProps.title}
        </FormButton>

        <p>
          {footProps.text} <Link href={footProps.href}>{footProps.title}</Link>
        </p>
      </form>
    </div>
  );
}
