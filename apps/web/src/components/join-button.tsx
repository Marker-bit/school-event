import { ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { JoinForm } from "./join-form";
import { useState } from "react";

export function JoinButton({
  buttonText = "Присоединиться",
}: {
  buttonText?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="leading-none">
          {buttonText}
          <ChevronRightIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Регистрация на мероприятие</DialogTitle>
          <DialogDescription>
            Заполните форму для регистрации.
          </DialogDescription>
        </DialogHeader>
        <JoinForm onSubmit={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
