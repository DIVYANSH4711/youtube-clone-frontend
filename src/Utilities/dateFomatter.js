const formatDate = (isoString) => {
   const date = new Date(isoString);
   return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
   });
};

export default formatDate;

