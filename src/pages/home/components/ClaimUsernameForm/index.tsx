import { Button, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import React, { memo } from "react";
import { Form } from "./styles";

export const ClaimUsernameFormComponent = () => {
  return (
    <Form as="form">
      <TextInput size="sm" prefix="ignite.com/" placeholder="seu-usuário" />
      <Button size="sm" type="submit">
        Reservar usuário
        <ArrowRight />
      </Button>
    </Form>
  );
};

export const ClaimUsernameForm = memo(ClaimUsernameFormComponent);
