export const steps = [
  {
    label: "Personal Information",
    status: "4 fields left",
    mandatoryFields: ["name", "course", "year", "location"], // Add the mandatory fields here
    fields: [
      {
        label: "name",
        value: "",
      },
      // {
      //   label: "image",
      //   value: "",
      // },
      {
        label: "course",
        value: "",
      },
      {
        label: "year",
        value: "",
      },
      {
        label: "location",
        value: "",
      },
      {
        label: "phone",
        value: "",
      },
    ],
  },
  {
    label: "Business Information",
    status: "4 fields left",
    mandatoryFields: ["company", "designation", "industry", "offers"], // Add the mandatory fields here
    fields: [
      {
        label: "company",
        value: "",
      },
      {
        label: "designation",
        value: "",
      },
      {
        label: "industry",
        value: "",
      },
      {
        label: "offers",
        value: "",
      },
    ],
  },
  {
    label: "Social Media Information",
    status: "2 fields left",
    mandatoryFields: ["linkedin", "website"], // Add the mandatory fields here
    fields: [
      {
        label: "linkedin",
        value: "",
      },
      {
        label: "website",
        value: "",
      },
    ],
  },
];
