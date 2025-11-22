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

export function JoinButton({
  buttonText = "Присоединиться",
}: {
  buttonText?: string;
}) {
  return (
    <Dialog>
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
        <JoinForm />
      </DialogContent>
    </Dialog>
  );
}
