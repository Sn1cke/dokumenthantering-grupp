export default function HowToUse() {
  const infoSteps = [
    {
      heading: "1. Create",
      text: "Start a new document and add text",
    },
    {
      heading: "2. Edit",
      text: "Highlight important parts of your text",
    },
    {
      heading: "3. Save",
      text: "Save your document when you're done. Simple!",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row max-w-6xl justify-between lg:justify-evenly mx-auto gap-4 mb-16 mt-8">
      {infoSteps.map((step, index) => {
        return (
          <div
            key={`info-${index}`}
            className="bg-neutral md:h-48 md:w-72 card rounded-box p-6 gap-2 min-h-12 md:min-h-52 "
          >
            <h3 className="text-white font-bold uppercase text-xl">
              {step.heading}
            </h3>
            <p className="text-neutral-content text-lg">{step.text}</p>
          </div>
        );
      })}
    </div>
  );
}
