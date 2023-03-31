import { Button, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "./styles";

const claimUsernameforSchema = z.object({
  username: z.string(),
});

type ClaimUsernameFormData = z.infer<typeof claimUsernameforSchema>;

export const ClaimUsernameFormComponent = () => {
  const { register, handleSubmit } = useForm<ClaimUsernameFormData>();

  const handleClaimUsername = (data: ClaimUsernameFormData) => {
    console.log(data.username);
  };

  return (
    <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
      <TextInput
        size="sm"
        prefix="ignite.com/"
        placeholder="seu-usuário"
        {...register("username")}
      />
      <Button size="sm" type="submit">
        Reservar usuário
        <ArrowRight />
      </Button>
    </Form>
  );
};

export const ClaimUsernameForm = memo(ClaimUsernameFormComponent);
