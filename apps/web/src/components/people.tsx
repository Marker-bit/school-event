import { CONFIG } from "@school-event/config";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { TelegramIcon } from "./icons/telegram";
import {
  CheckIcon,
  MailIcon,
  User2Icon,
  UserIcon,
  type LucideIcon,
} from "lucide-react";
import { useState, type FC } from "react";

export function People() {
  return (
    <>
      <div className="text-3xl font-bold mt-8 mb-4">Организаторы</div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-sm:place-items-start w-full
        md:justify-items-center"
      >
        {CONFIG.people.map((person) => (
          <Contact
            name={person.name}
            telegramUsername={person.telegramUsername}
            email={person.email}
            key={person.name}
          />
        ))}
      </div>
    </>
  );
}

function Contact({
  name,
  avatarUrl,
  telegramUsername,
  email,
}: {
  name: string;
  avatarUrl?: string;
  telegramUsername: string;
  email: string;
}) {
  return (
    <div className="flex flex-col gap-2 w-full border p-2 rounded-md">
      <div className="flex gap-2 items-center">
        {avatarUrl ? (
          <img src={avatarUrl} className="size-8 rounded-full" />
        ) : (
          <div className="size-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
            <User2Icon className="size-4" />
          </div>
        )}
        <h3 className="font-semibold text-xl">{name}</h3>
      </div>

      <div className="flex flex-col gap-2">
        <SingleContact
          icon={TelegramIcon}
          iconText="Telegram"
          text={`@${telegramUsername}`}
          url={`https://t.me/${telegramUsername}`}
        />
        <SingleContact
          icon={MailIcon}
          iconText="Почта"
          text={email}
          url={`mailto:${email}`}
        />
      </div>
    </div>
  );
}

export function SingleContact({
  icon: Icon,
  iconText,
  text,
  url,
}: {
  icon: React.FC;
  iconText: string;
  text: string;
  url: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    if (copied) return;
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className="flex gap-2 items-center">
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button asChild size="icon" variant="outline" className="size-8">
            <a href={url} target="_blank">
              {copied ? <CheckIcon /> : <Icon />}
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{iconText}</TooltipContent>
      </Tooltip>
      <button className="text-sm relative" onClick={copy}>
        <div
          className={cn(
            "absolute top-0 -translate-y-full -translate-x-1/2 left-1/2 bg-green-600 text-white rounded-md leading-none px-2 py-1 transition-all duration-300 origin-bottom pointer-events-none",
            !copied && "scale-[80%] -translate-y-[50%] opacity-0 blur-sm",
          )}
        >
          Скопировано!
        </div>
        {text}
      </button>
    </div>
  );
}
