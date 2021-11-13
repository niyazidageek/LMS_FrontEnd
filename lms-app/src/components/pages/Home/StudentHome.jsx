// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Image,
  Portal,
  Progress,
  SimpleGrid,
  Spacer,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// assets
// Custom components
import Card from "../../cards/Card";
import CardBody from "../../cards/CardBody";
import CardHeader from "../../cards/CardHeader";
import IconBox from "../../icons/IconBox";
// Custom icons
import {
  CartIcon,
  GlobeIcon,
  RocketIcon,
  StatsIcon,
  WalletIcon,
} from "../../icons/Icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpinnerComponent from "../../spinners/SpinnerComponent";
import { useValidateToken } from "../../../hooks/useValidateToken";
// react icons
import { FaChalkboardTeacher, FaFile, FaChartPie, FaFileAlt } from "react-icons/fa";
import { BsArrowRight, BsTypeH1 } from "react-icons/bs";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { getStudentHomeAction } from "../../../actions/studentHomeActions";

export default function StudentHome() {
  const value = "$100.000";
  useValidateToken();
  const dispatch = useDispatch();
  // Chakra Color Mode
  const { colorMode, toggleColorMode } = useColorMode();
  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const [series, setSeries] = useState([
    {
      type: "area",
      name: "Mobile apps",
      data: [190, 220, 205, 350, 370, 450, 400, 360, 210, 250, 292, 150],
    },
    {
      type: "area",
      name: "Websites",
      data: [400, 291, 121, 117, 25, 133, 121, 211, 147, 25, 201, 203],
    },
  ]);
  const overlayRef = React.useRef();

  const dashboardTableData = [1, 2, 3, 4, 5];

  const homeContent = useSelector((state) => state.studentHomeReducer);
  const token = useSelector((state) => state.authReducer.jwt);
  const isFetching = useSelector((state) => state.authReducer.isFetching);

  useEffect(() => {
    dispatch(getStudentHomeAction(token));
  }, []);

  return isFetching || !homeContent ? (
    <SpinnerComponent />
  ) : (
    (console.log(homeContent),
    (
      <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
        <SimpleGrid columns={{ sm: 1, md: 3, xl: 3 }} spacing="24px">
          <Card minH="83px">
            <CardBody>
              <Flex
                flexDirection="row"
                align="center"
                justify="center"
                w="100%"
              >
                <Stat me="auto">
                  <StatLabel
                    fontSize="sm"
                    color="gray.400"
                    fontWeight="bold"
                    pb=".1rem"
                  >
                    Teacher
                  </StatLabel>
                  <Flex>
                    <StatNumber fontSize="xl" color={textColor}>
                      {(homeContent.teacher && homeContent.teacher.name) ??
                        "No teacher"}
                    </StatNumber>
                  </Flex>
                </Stat>
                <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                  <FaChalkboardTeacher
                    size={24}
                    color={iconBoxInside}
                  />
                </IconBox>
              </Flex>
            </CardBody>
          </Card>
          <Card minH="83px">
            <CardBody>
              <Flex
                flexDirection="row"
                align="center"
                justify="center"
                w="100%"
              >
                <Stat mr='1rem'>
                  <StatLabel
                    fontSize="sm"
                    color="gray.400"
                    fontWeight="bold"
                    pb=".1rem"
                  >
                    Progress
                  </StatLabel>
                  <Text fontWeight="bold" fontSize="lg">
                      {homeContent.progressPercentage}%
                    </Text>
                  <Progress
                      colorScheme="teal"
                      borderRadius="12px"
                      h="5px"
                      value={homeContent.progressPercentage}
                    />
                </Stat>
                <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                  <FaChartPie size={24} color={iconBoxInside} />
                </IconBox>
              </Flex>
            </CardBody>
          </Card>
          <Card minH="83px">
            <CardBody>
              <Flex
                flexDirection="row"
                align="center"
                justify="center"
                w="100%"
              >
                <Stat>
                  <StatLabel
                    fontSize="sm"
                    color="gray.400"
                    fontWeight="bold"
                    pb=".1rem"
                  >
                    Assignments
                  </StatLabel>
                  <Flex>
                    <StatNumber fontSize="lg" color={textColor}>
                      23/50
                    </StatNumber>
                  </Flex>
                </Stat>
                <Spacer />
                <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                  <FaFileAlt size={24} color={iconBoxInside} />
                </IconBox>
              </Flex>
            </CardBody>
          </Card>
        </SimpleGrid>

        <Card
          marginTop="3rem"
          p="16px"
          overflowX={{ sm: "scroll", xl: "hidden" }}
        >
          <CardHeader p="10px 5px" width="max-content">
            <Text
              textAlign="center"
              fontSize="lg"
              color={textColor}
              fontWeight="bold"
            >
              Upcoming lessons
            </Text>
          </CardHeader>
          <Box variant="simple" color={textColor}>
            <Box
              width="100%"
              overflow="hidden"
              p="0 1rem"
              height="500px"
              overflowY="scroll"
            >
              {dashboardTableData.map((row, index) => {
                return (
                  <>
                    <Card
                      justifyContent="space-between"
                      flexDirection="row"
                      m="1rem 0"
                      boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                    >
                      <Flex
                        justifyContent="space-between"
                        flex="5"
                        flexDirection="column"
                      >
                        <CardHeader>
                          <Text
                            textAlign="center"
                            fontSize="lg"
                            marginBottom="1rem"
                            color={textColor}
                            fontWeight="bold"
                          >
                            Lesson: Derivatives
                          </Text>
                        </CardHeader>
                        <CardBody>
                          <SimpleGrid
                            width="100%"
                            columns={{ sm: 3, md: 3, xl: 3 }}
                            spacing="12px  "
                          >
                            <Card
                              p="0.4rem"
                              height="max-content"
                              boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                            >
                              <CardBody>
                                <Flex
                                  flexDirection="row"
                                  align="center"
                                  justify="center"
                                  w="100%"
                                >
                                  <Stat me="auto">
                                    <StatLabel
                                      fontSize="sm"
                                      color="gray.400"
                                      fontWeight="bold"
                                    >
                                      Assignments
                                    </StatLabel>
                                    <Flex>
                                      <StatNumber
                                        fontWeight="medium"
                                        fontSize="sm"
                                        color={textColor}
                                      >
                                        0/2
                                      </StatNumber>
                                    </Flex>
                                  </Stat>
                                  <FaFileAlt
                                    color="gray"
                                  />
                                </Flex>
                              </CardBody>
                            </Card>

                            <Card
                              p="0.4rem"
                              height="max-content"
                              boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                            >
                              <CardBody>
                                <Flex
                                  flexDirection="row"
                                  align="center"
                                  justify="center"
                                  w="100%"
                                >
                                  <Stat me="auto">
                                    <StatLabel
                                      fontSize="sm"
                                      color="gray.400"
                                      fontWeight="bold"
                                    >
                                      Materials
                                    </StatLabel>
                                    <Flex>
                                      <StatNumber
                                        fontWeight="medium"
                                        fontSize="sm"
                                        color={textColor}
                                      >
                                        0/2
                                      </StatNumber>
                                    </Flex>
                                  </Stat>
                                  <FaFileAlt
                                    color="gray"
                                  />
                                </Flex>
                              </CardBody>
                            </Card>
                          </SimpleGrid>
                        </CardBody>
                      </Flex>

                      <Flex
                        borderRight="1px"
                        borderLeft="1px"
                        borderColor="lightgray"
                        flex="1"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <Text
                          textAlign="center"
                          fontSize="md"
                          marginBottom="0.5rem"
                        >
                          Sunday 11.06
                        </Text>

                        <Text
                          textAlign="center"
                          fontSize="lg"
                          fontWeight="bold"
                          m="0.3rem 0"
                        >
                          12:00-14:00
                        </Text>

                        <Text textAlign="center" fontSize="sm" m="0.3rem 0">
                          Online
                        </Text>

                        <Box
                          marginTop="0.5rem"
                          p="0.4rem"
                          borderRadius="10px"
                          bg="lightgray"
                          width="max-content"
                        >
                          <Text color="white" textAlign="center" fontSize="sm">
                            Hasn't started yet
                          </Text>
                        </Box>
                      </Flex>
                    </Card>
                  </>
                );
              })}
            </Box>
          </Box>
        </Card>
      </Flex>
    ))
  );
}