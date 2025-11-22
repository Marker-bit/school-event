"use client";

import * as React from "react";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CONFIG } from "@school-event/config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { client } from "@/lib/api";

export const joinFormSchema = z.object({
  name: z
    .string()
    .min(1, "Введите имя")
    .max(32, "Максимальная длина имени - 32 символа."),
  grade: z.string().min(1, "Введите класс"),
  mostInterestedIn: z
    .enum(CONFIG.programme.map((item) => item.title))
    .nullable(),
});

export function JoinForm({ onSubmit }: { onSubmit?: () => void }) {
  const form = useForm({
    defaultValues: {
      name: "",
      grade: "",
      mostInterestedIn: null as string | null,
    },
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: joinFormSchema,
    },
    onSubmit: async ({ value }) => {
      await client.submit.post(value);
      toast.success("Отправлено!");
      onSubmit?.();
    },
  });

  return (
    <form
      id="join-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field
          name="name"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Ваше имя</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <form.Field
          name="grade"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Ваш класс</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  aria-invalid={isInvalid}
                />
                <FieldDescription>
                  Введите свой класс, например: 7Б
                </FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <form.Field
          name="mostInterestedIn"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldContent>
                  <FieldLabel htmlFor="most-interested-in">
                    Самый интересный элемент программы
                  </FieldLabel>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </FieldContent>
                <Select
                  name={field.name}
                  value={field.state.value ?? "none"}
                  onValueChange={(val) =>
                    field.setValue(val === "none" ? null : val)
                  }
                >
                  <SelectTrigger
                    id="most-interested-in"
                    aria-invalid={isInvalid}
                    className="min-w-[120px]"
                  >
                    <SelectValue placeholder="Выберите" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    <SelectItem value="none">Никакой</SelectItem>
                    {CONFIG.programme.map((item) => (
                      <SelectItem key={item.title} value={item.title}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            );
          }}
        />
      </FieldGroup>
      <div className="flex gap-2 items-center mt-2">
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Сбросить
          </Button>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit}>
                Отправить
              </Button>
            )}
          />
        </Field>
      </div>
    </form>
  );
}
