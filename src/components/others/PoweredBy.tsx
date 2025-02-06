import { Image } from "antd";

const PoweredBy = () => {
    return (
        <div className="flex items-center gap-x-2 flex-wrap">
            <a rel="noopener noreferrer">
                <Image
                    src="https://www.eposhybrid.uk/ihybridnew//upload/ck/2035148938.png"
                    alt="Powered by Stripe"
                    preview={false}
                    width={120}
                />
            </a>
            <a rel="noopener noreferrer">
                <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                    alt="Powered by Stripe"
                    preview={false}
                    width={50}
                />
            </a>
            <a rel="noopener noreferrer">
                <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png"
                    alt="Powered by Stripe"
                    preview={false}
                    width={40}
                />
            </a>
        </div>
    );
};

export default PoweredBy;
