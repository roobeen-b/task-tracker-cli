declare type TTask = {
  id: number;
  description: string;
  status: "todo" | "in-progress" | "done";
  createdAt: Date;
  updatedAt: Date;
};
