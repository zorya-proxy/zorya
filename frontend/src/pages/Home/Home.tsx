import { ModeToggle } from "@/components/ModeToggle";
import classes from "./Home.module.scss";

export default function Home() {
  return (
    <main className={classes.HomeContainer}>
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <h1>Home Page Zorya Proxy</h1>
    </main>
  );
}
