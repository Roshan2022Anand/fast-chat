const Contact = ({ name }: { name: string }) => {
  return (
    <figure className="border-b-2 border-prime flex gap-3 py-2">
      <img src="#" alt="img" className="rounded-full bg-black size-[30px]" />
      <p className="grow ">{name}</p>
    </figure>
  );
};

export default Contact;
