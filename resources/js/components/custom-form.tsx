/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputName } from '@/types';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';

import InputError from './input-error';
import ConfirmModal from './modal/confirm-modal';
import Tiptap from './tiptap';
import { Button } from './ui/button';
import FileUpload from './ui/file-upload';
import { Textarea } from './ui/text-area';

interface CustomFormProps<T extends string = string> {
  inputs: InputName<T>[];
  processing: boolean;
  data: Record<string, any>;
  errors: Record<string, string>;
  setData: (key: string, value: any) => void;
  submit: () => void;
}

export default function CustomForm({ inputs, processing, data, errors, setData, submit }: CustomFormProps) {
  return (
    <form className="grid grid-cols-2 items-start gap-8">
      {inputs.map((input) => (
        <div className={`grid gap-2 ${input.col ? `col-span-${input.col}` : 'col-span-2'}`} key={input.name}>
          {input.type !== 'toggle' && <Label htmlFor={input.name}>{input.label}</Label>}

          {input.type === 'text' ? (
            <Input
              disabled={input.disabled || processing}
              id={input.name}
              name={input.name}
              className="mt-1 block w-full"
              value={data[input.name] ?? ''}
              onChange={(e) => setData(input.name, e.target.value)}
              required={input.required ?? false}
              placeholder={input.placeholder}
            />
          ) : input.type === 'select' ? (
            <Select
              disabled={input.disabled || processing}
              value={data[input.name]?.toString() ?? ''}
              onValueChange={(value) => setData(input.name, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={input.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {input.options?.map((item) => (
                  <SelectItem key={item.id} value={item.id.toString()}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : input.type === 'file' ? (
            <FileUpload
              onChange={(e) => setData(input.name, e ?? '')}
              value={data[input.name] as string | File}
              disabled={input.disabled || processing}
              className="mt-1"
            />
          ) : input.type === 'toggle' ? (
            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label>{input.label}</Label>
                {input.helperText && <p className="text-muted-foreground text-[0.8rem]">{input.helperText}</p>}
              </div>
              <Switch
                disabled={input.disabled || processing}
                checked={!!data[input.name]}
                onCheckedChange={(value) => setData(input.name, value)}
                aria-readonly
              />
            </div>
          ) : input.type === 'rich editor' ? (
            <Tiptap content={data[input.name]} setContent={(e) => setData(input.name, e)} />
          ) : input.type === 'textarea' ? (
            <Textarea
              disabled={input.disabled || processing}
              rows={5}
              onChange={(e) => setData(input.name, e.target.value)}
              value={data[input.name]}
            />
          ) : null}

          {input.description && <p className="text-muted-foreground text-[0.8rem]">{input.description}</p>}

          {errors[input.name] && <InputError className="mt-2" message={errors[input.name]} />}
        </div>
      ))}

      <ConfirmModal onClick={() => !processing && submit()}>
        <Button disabled={processing} className="w-fit">
          Submit
        </Button>
      </ConfirmModal>
    </form>
  );
}
