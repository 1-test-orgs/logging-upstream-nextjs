import packageJson from "../package.json";

export default function Home() {
  return <div>Welcome to Pantheon Platform {packageJson.version}</div>;
}
