"use client";
import * as React from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { contactFormAction } from "@/lib/actions";
import { Check } from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-context";

export function Form({
  className,
  onSuccess,
}: React.ComponentProps<typeof Card> & { onSuccess?: () => void }) {
  const { t } = useLocale();
  const [subject, setSubject] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [state, setState] = React.useState<{
    defaultValues: { name: string; email: string; message: string };
    success: boolean;
    errors: Record<string, string> | null;
  }>({
    defaultValues: { name: "", email: "", message: "" },
    success: false,
    errors: null,
  });

  React.useEffect(() => {
    if (state.success) onSuccess?.();
  }, [state.success, onSuccess]);

  const formAction = async (formData: FormData) => {
    setPending(true);
    try {
      const result = await contactFormAction(null, formData);
      setState(result as typeof state);
    } finally {
      setPending(false);
    }
  };
  return (
    <Card className={cn("w-full max-w-md bg-wineRed-200 h-full flex flex-col", className)}>
      <CardHeader>
        <CardTitle className="text-cream-200">{t.form.heading}</CardTitle>
        <CardDescription className="text-cream-200/90">{t.form.subtitle}</CardDescription>
      </CardHeader>
      <form
        className="flex flex-col flex-1"
        onSubmit={(e) => {
          e.preventDefault();
          formAction(new FormData(e.currentTarget));
        }}
      >
        <CardContent className="flex flex-col gap-6 flex-1">
          {state.success ? (
            <p
              className="text-cream-200 flex items-center gap-2 text-sm"
              role="status"
              aria-live="polite"
            >
              <Check className="size-4" />
              {t.form.success}
            </p>
          ) : null}
          <div className="group/field grid gap-2" data-invalid={!!state.errors?.name}>
            <Label
              htmlFor="name"
              className="group-data-[invalid=true]/field:text-cream-100/80 text-cream-200"
            >
              {t.form.name} <span aria-hidden="true">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              placeholder="Lee Robinson"
              className="group-data-[invalid=true]/field:border-cream-200 group-data-[invalid=true]/field:focus-visible:ring-destructive text-cream-100 placeholder:text-cream-100/60 bg-wineRed-100/20"
              disabled={pending}
              aria-invalid={!!state.errors?.name}
              aria-errormessage="error-name"
              defaultValue={state.defaultValues.name}
            />
            {state.errors?.name && (
              <p id="error-name" className="text-red-300 text-sm">
                {state.errors.name}
              </p>
            )}
          </div>
          <div className="group/field grid gap-2" data-invalid={!!state.errors?.email}>
            <Label
              htmlFor="email"
              className="group-data-[invalid=true]/field:text-destructive text-cream-200"
            >
              {t.form.email} <span aria-hidden="true">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              autoComplete="email"
              placeholder="leerob@acme.com"
              className="group-data-[invalid=true]/field:border-cream-200 group-data-[invalid=true]/field:focus-visible:ring-destructive text-cream-100 placeholder:text-cream-100/60 bg-wineRed-100/20"
              disabled={pending}
              aria-invalid={!!state.errors?.email}
              aria-errormessage="error-email"
              defaultValue={state.defaultValues.email}
            />
            {state.errors?.email && (
              <p id="error-email" className="text-red-300 text-sm">
                {state.errors.email}
              </p>
            )}
          </div>
          <div className="group/field grid gap-2" data-invalid={!!state.errors?.message}>
            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium mb-1 text-cream-200">
                {t.form.subject} *
              </label>
              <select
                id="subject"
                name="subject"
                autoComplete="off"
                required
                className="w-full px-4 py-2 border border-cream-200 rounded-md focus:outline-hidden focus:ring-2 focus:ring-gold/50 text-cream-100 bg-wineRed-100/20"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="">{t.form.subjectPlaceholder}</option>
                <option value="General Inquiry">{t.form.subjectGeneral}</option>
                <option value="Wine Orders">{t.form.subjectOrders}</option>
                <option value="Winery Visit">{t.form.subjectVisit}</option>
                <option value="Wholesale">{t.form.subjectWholesale}</option>
                <option value="Other">{t.form.subjectOther}</option>
              </select>
            </div>
            <Label
              htmlFor="message"
              className="group-data-[invalid=true]/field:text-destructive text-cream-200"
            >
              {t.form.message} <span aria-hidden="true">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              autoComplete="off"
              placeholder="Type your message here..."
              className="group-data-[invalid=true]/field:border-cream-200 group-data-[invalid=true]/field:focus-visible:ring-destructive text-cream-100 placeholder:text-cream-100/60 bg-wineRed-100/20"
              disabled={pending}
              aria-invalid={!!state.errors?.message}
              aria-errormessage="error-message"
              defaultValue={state.defaultValues.message}
            />
            {state.errors?.message && (
              <p id="error-message" className="text-red-300 text-sm">
                {state.errors.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            size="sm"
            disabled={pending}
            className="bg-cream-200 text-deepBrown-100 hover:bg-cream-100 transition-colors"
          >
            {pending ? t.form.sending : t.form.send}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
