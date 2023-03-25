import classes from "../style/messages.module.css";

const Loader = () => {
  return (
    <div className={classes.center}>
      {Array(10)
        .fill(0)
        .map((_, i) => {
          return <div key={i} className={classes.wave}></div>;
        })}
    </div>
  );
};

export default Loader;
