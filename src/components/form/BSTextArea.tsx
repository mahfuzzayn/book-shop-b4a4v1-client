import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TTextAreaProps = {
    name: string;
    label?: string;
    disabled?: boolean;
};

const BSTextArea = ({ name, label, disabled }: TTextAreaProps) => {
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
                        <Input.TextArea
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

export default BSTextArea;
