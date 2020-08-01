<template>
  	<v-container>
    	<v-btn id='printButton' v-on:click="printButton()">Print</v-btn>
  	</v-container>
</template>

<script>
  	export default {
        data() {
            return {
                currentPrinterName: '',
                printers: [],
                printer: null,
            }
        },
  		mounted() {
            //dymo.label.framework.init(this.onRender());
		},
		methods: {
            printBtn: function () {
                this.currentPrinterName = this.printer.name; //this.currentPrinterName = this.prin.name
                console.log("test 2")
                let label = document.head.dymo.label.framework.openLabelXml(this.getLabel());

                label.printAndPollStatus(this.printer.name);
                
            },
            onRender: function () {
                this.printers = document.head.dymo.label.framework.getPrinters();
                this.printer = this.printers[0];
            },
            getLabel: function () {
                var labelXml = `<?xml version="1.0" encoding="utf-8"?>
                <DieCutLabel Version="8.0" Units="twips" MediaType="Default">
                <PaperOrientation>Landscape</PaperOrientation>
                <Id>NameBadgeCard</Id>
                <PaperName>30856 Badge Card Label - offset</PaperName>
                <DrawCommands>
                    <Path>
                    <Line X1="3509" Y1="0" X2="3509" Y2="6000"/>
                    <LineTo X="517" Y="6000"/>
                    <Arc CenterX="432" CenterY="6000" Radius="85" StartAngle="0" EndAngle="90"/>
                    <LineTo X="0" Y="5915"/>
                    <LineTo X="0" Y="85"/>
                    <LineTo X="432" Y="85"/>
                    <Arc CenterX="432" CenterY="0" Radius="85" StartAngle="-90" EndAngle="0"/>
                    <LineTo X="3509" Y="0"/>
                    <RoundRectangle X="2969" Y="2640" Width="180" Height="720" Rx="120" Ry="120"/>
                    </Path>
                </DrawCommands>
                <ObjectInfo>
                    <TextObject>
                    <Name>TEXT</Name>
                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
                    <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>
                    <LinkedObjectName></LinkedObjectName>
                    <Rotation>Rotation0</Rotation>
                    <IsMirrored>False</IsMirrored>
                    <IsVariable>False</IsVariable>
                    <HorizontalAlignment>Center</HorizontalAlignment>
                    <VerticalAlignment>Middle</VerticalAlignment>
                    <TextFitMode>AlwaysFit</TextFitMode>
                    <UseFullFontHeight>True</UseFullFontHeight>
                    <Verticalized>False</Verticalized>
                    <StyledText>
                        <Element>
                        <String>Access</String>
                        <Attributes>
                            <Font Family="Helvetica" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
                            <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
                        </Attributes>
                        </Element>
                    </StyledText>
                    </TextObject>
                    <Bounds X="450" Y="464.3481" Width="5377" Height="1406.328"/>
                </ObjectInfo>
                <ObjectInfo>
                    <TextObject>
                    <Name>TEXT_1</Name>
                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
                    <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>
                    <LinkedObjectName></LinkedObjectName>
                    <Rotation>Rotation0</Rotation>
                    <IsMirrored>False</IsMirrored>
                    <IsVariable>False</IsVariable>
                    <HorizontalAlignment>Center</HorizontalAlignment>
                    <VerticalAlignment>Middle</VerticalAlignment>
                    <TextFitMode>ShrinkToFit</TextFitMode>
                    <UseFullFontHeight>True</UseFullFontHeight>
                    <Verticalized>False</Verticalized>
                    <StyledText>
                        <Element>
                        <String>First Name + Last Name</String>
                        <Attributes>
                            <Font Family="Helvetica" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
                            <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
                        </Attributes>
                        </Element>
                    </StyledText>
                    </TextObject>
                    <Bounds X="450" Y="1815.312" Width="5377" Height="784.8438"/>
                </ObjectInfo>
                <ObjectInfo>
                    <TextObject>
                    <Name>TEXT_2</Name>
                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
                    <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>
                    <LinkedObjectName></LinkedObjectName>
                    <Rotation>Rotation0</Rotation>
                    <IsMirrored>False</IsMirrored>
                    <IsVariable>False</IsVariable>
                    <HorizontalAlignment>Center</HorizontalAlignment>
                    <VerticalAlignment>Middle</VerticalAlignment>
                    <TextFitMode>ShrinkToFit</TextFitMode>
                    <UseFullFontHeight>True</UseFullFontHeight>
                    <Verticalized>False</Verticalized>
                    <StyledText>
                        <Element>
                        <String>C</String>
                        <Attributes>
                            <Font Family="Helvetica" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
                            <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
                        </Attributes>
                        </Element>
                        <Element>
                        <String>ompany</String>
                        <Attributes>
                            <Font Family="Helvetica" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>
                            <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>
                        </Attributes>
                        </Element>
                    </StyledText>
                    </TextObject>
                    <Bounds X="450" Y="2635.469" Width="5377" Height="600"/>
                </ObjectInfo>
                </DieCutLabel>`;
                return labelXml;
            }
		}
  	};
</script>
<style scoped>

</style>
