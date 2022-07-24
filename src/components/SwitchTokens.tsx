import { Image } from "@chakra-ui/react"
import { assetsIcons } from 'src/constants';

export default function SwitchTokens(props: any) {

    const { assetIn, assetOut, onClick } = props;

    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "left", margin: "1rem" }}>
            <div style={{
                height: "56px",
                position: "relative",
                display: "flex",
                flexDirection: "row",
                marginRight: "22.6667px",
                bottom: "15px"
            }}
                onClick={onClick}
            >
                <div style={{
                    zIndex: 2,
                    backgroundColor: "rgb(255, 255, 255, 0.15)",
                    borderRadius: "50%",
                    width: "44px",
                    height: "44px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }} >
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }} >
                        <Image width="29.33px" height="29.33px" borderRadius="50%" src={assetsIcons[assetIn]} />
                    </div>
                </div>
                <div style={{
                    position: "absolute",
                    left: "29.3333px",
                    top: "18.6667px",
                    backgroundColor: "rgb(255, 255, 255, 0.15)",
                    borderRadius: "50%",
                    width: "44px",
                    height: "44px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }} >
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }} >
                        <Image width="29.33px" height="29.33px" borderRadius="50%" src={assetsIcons[assetOut]} />
                    </div>
                </div>
            </ div >
        </div>
    )

}