import classes from './page.module.css';

export default function MealsLoadingPage() {
  return (
    <p className={classes.loading}>Fetching Meals...</p>
  );
}