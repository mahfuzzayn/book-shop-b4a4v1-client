import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
    type: string;
    name: string;
    label?: string;
    disabled?: boolean;
};

const BSInput = ({ type, name, label, disabled }: TInputProps) => {
    return (
        <div style={{ marginBottom: "20px" }}>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Form.Item
                        label={label}
                        htmlFor={name}
                        className="font-bold"
                    >
                        <Input
                            type={type}
                            {...field}
                            id={name}
                            className="font-normal"
                            size="large"
                            disabled={disabled}
                        />

                        {error && (
                            <small
                                style={{ color: "red", fontWeight: "normal" }}
                            >
                                {error?.message}
                            </small>
                        )}
                    </Form.Item>
                )}
            />
        </div>
    );
};

export default BSInput;
