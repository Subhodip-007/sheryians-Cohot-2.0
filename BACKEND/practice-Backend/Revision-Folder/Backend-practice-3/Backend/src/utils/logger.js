
const colors = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m",
    gray: "\x1b[90m"
};

const getTime = () => {
    return new Date().toLocaleString();
};

const logger = {
    info: (...message) => {
        console.log(
            `${colors.blue}[INFO]${colors.reset}`,
            getTime(),
            ...message
        );
    },

    success: (...message) => {
        console.log(
            `${colors.green}[SUCCESS]${colors.reset}`,
            getTime(),
            ...message
        );
    },

    warn: (...message) => {
        console.log(
            `${colors.yellow}[WARN]${colors.reset}`,
            getTime(),
            ...message
        );
    },

    error: (...message) => {
        console.log(
            `${colors.red}[ERROR]${colors.reset}`,
            getTime(),
            ...message
        );
    },

    debug: (...message) => {
        if (process.env.NODE_ENV !== "production") {
            console.log(
                `${colors.gray}[DEBUG]${colors.reset}`,
                getTime(),
                ...message
            );
        }
    }
};

export default logger;
