import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Trophy, 
  Star, 
  Gift, 
  Clock, 
  Users, 
  Zap,
  RotateCcw,
  CheckCircle,
  Timer,
  Flame,
  Award,
  ShoppingCart,
  Coins
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import {
  dailyQuizQuestions,
  spinRewards,
  availableBadges,
  flashSaleItems,
  defaultUserProgress,
  type QuizQuestion,
  type SpinReward,
  type BadgeType,
  type FlashSaleItem,
  type UserProgress
} from '@/data/gamificationData';

const Gamification = () => {
  const { toast } = useToast();
  const { addItem } = useCart();
  
  // User progress state
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('walmart-gamification-progress');
    return saved ? JSON.parse(saved) : defaultUserProgress;
  });

  // Quiz state
  const [currentQuiz, setCurrentQuiz] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);

  // Spin wheel state
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<SpinReward | null>(null);
  const [rotation, setRotation] = useState(0);

  // Flash sale state
  const [flashSales, setFlashSales] = useState(flashSaleItems);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('walmart-gamification-progress', JSON.stringify(userProgress));
  }, [userProgress]);

  // Initialize daily quiz
  useEffect(() => {
    const today = new Date().toDateString();
    if (userProgress.lastQuizDate !== today) {
      // Get random 3 questions for today
      const shuffled = [...dailyQuizQuestions].sort(() => 0.5 - Math.random());
      setCurrentQuiz(shuffled.slice(0, 3));
    }
  }, [userProgress.lastQuizDate]);

  // Quiz timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizStarted && timeLeft > 0 && !quizCompleted) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && !quizCompleted) {
      handleQuizComplete();
    }
    return () => clearTimeout(timer);
  }, [quizStarted, timeLeft, quizCompleted]);

  // Flash sale countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setFlashSales(prev => prev.map(item => ({
        ...item,
        endTime: item.endTime
      })));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const canTakeQuiz = () => {
    const today = new Date().toDateString();
    return userProgress.lastQuizDate !== today;
  };

  const canSpin = () => {
    const today = new Date().toDateString();
    return userProgress.lastSpinDate !== today || userProgress.spinsUsed < userProgress.maxSpinsPerDay;
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setQuizCompleted(false);
    setQuizScore(0);
    setTimeLeft(30);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const currentQuestion = currentQuiz[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setQuizScore(prev => prev + currentQuestion.points);
    }

    if (currentQuestionIndex < currentQuiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    setQuizCompleted(true);
    setQuizStarted(false);
    
    const today = new Date().toDateString();
    const newStreak = userProgress.lastQuizDate === new Date(Date.now() - 86400000).toDateString() 
      ? userProgress.quizStreak + 1 
      : 1;

    setUserProgress(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + quizScore,
      lastQuizDate: today,
      quizStreak: newStreak
    }));

    toast({
      title: "Quiz Complete!",
      description: `You earned ${quizScore} points! Current streak: ${newStreak} days`,
    });

    checkBadges();
  };

  const handleSpin = () => {
    if (!canSpin() || isSpinning) return;

    setIsSpinning(true);
    
    // Calculate random reward based on probability
    const random = Math.random() * 100;
    let cumulativeProbability = 0;
    let selectedReward = spinRewards[0];

    for (const reward of spinRewards) {
      cumulativeProbability += reward.probability;
      if (random <= cumulativeProbability) {
        selectedReward = reward;
        break;
      }
    }

    // Calculate rotation (multiple full spins + final position)
    const spins = 5 + Math.random() * 5; // 5-10 full rotations
    const finalRotation = rotation + (spins * 360) + (Math.random() * 360);
    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setSpinResult(selectedReward);
      
      const today = new Date().toDateString();
      setUserProgress(prev => ({
        ...prev,
        spinsUsed: prev.lastSpinDate === today ? prev.spinsUsed + 1 : 1,
        lastSpinDate: today,
        totalPoints: prev.totalPoints + (selectedReward.type === 'points' ? parseInt(selectedReward.value) : 0)
      }));

      toast({
        title: "Congratulations!",
        description: `You won: ${selectedReward.title} - ${selectedReward.description}`,
      });

      checkBadges();
    }, 3000);
  };

  const checkBadges = () => {
    const newBadges = [...userProgress.badges];
    let badgeEarned = false;

    availableBadges.forEach(badge => {
      if (newBadges.includes(badge.id)) return;

      let shouldEarn = false;
      switch (badge.id) {
        case 'quiz_master':
          shouldEarn = userProgress.totalPoints >= 100; // Assuming 10 correct answers
          break;
        case 'spin_champion':
          shouldEarn = userProgress.spinsUsed >= 5;
          break;
        case 'streak_master':
          shouldEarn = userProgress.quizStreak >= 7;
          break;
        case 'loyal_shopper':
          shouldEarn = userProgress.totalOrders >= 5;
          break;
        case 'first_order':
          shouldEarn = userProgress.totalOrders >= 1;
          break;
        case 'big_spender':
          shouldEarn = userProgress.totalOrders >= 10; // Simplified check
          break;
      }

      if (shouldEarn) {
        newBadges.push(badge.id);
        badgeEarned = true;
        toast({
          title: "Badge Earned!",
          description: `You've earned the "${badge.name}" badge!`,
        });
      }
    });

    if (badgeEarned) {
      setUserProgress(prev => ({ ...prev, badges: newBadges }));
    }
  };

  const handleClaimFlashSale = (item: FlashSaleItem) => {
    const product = {
      id: item.id,
      name: item.name,
      price: item.salePrice,
      image: item.image,
      description: `Flash sale item - ${item.discount}% off!`,
      category: 'Flash Sale'
    };
    
    addItem(product);
    
    setFlashSales(prev => prev.map(sale => 
      sale.id === item.id 
        ? { ...sale, claimed: Math.min(sale.claimed + 1, sale.total) }
        : sale
    ));

    toast({
      title: "Added to Cart!",
      description: `${item.name} added to your cart at flash sale price!`,
    });
  };

  const getTimeRemaining = (endTime: string) => {
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    const diff = end - now;

    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };

    return {
      hours: Math.floor(diff / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000)
    };
  };

  const userLevel = Math.floor(userProgress.totalPoints / 100) + 1;
  const pointsToNextLevel = (userLevel * 100) - userProgress.totalPoints;

  return (
    <div className="min-h-screen bg-gradient-to-br from-walmart-gray-light to-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-walmart-blue-light text-primary-foreground">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-primary-foreground hover:underline mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Trophy className="h-8 w-8 text-walmart-yellow" />
              <div>
                <h1 className="text-3xl font-bold">Walmart Rewards Hub</h1>
                <p className="text-lg opacity-90">Play, earn, and save with exclusive rewards</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <Coins className="h-5 w-5 text-walmart-yellow" />
                <span className="text-xl font-bold">{userProgress.totalPoints}</span>
                <span className="text-sm opacity-75">points</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-walmart-yellow" />
                <span>Level {userLevel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Overview */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userProgress.totalPoints}</div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-walmart-yellow">{userLevel}</div>
                <div className="text-sm text-muted-foreground">Current Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-sale-red">{userProgress.quizStreak}</div>
                <div className="text-sm text-muted-foreground">Quiz Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{userProgress.badges.length}</div>
                <div className="text-sm text-muted-foreground">Badges Earned</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress to Level {userLevel + 1}</span>
                <span>{pointsToNextLevel} points needed</span>
              </div>
              <Progress value={((userProgress.totalPoints % 100) / 100) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Daily Quiz */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-walmart-yellow" />
                <span>Daily Trivia Quiz</span>
                {userProgress.quizStreak > 0 && (
                  <Badge className="bg-sale-red text-sale-red-foreground">
                    <Flame className="h-3 w-3 mr-1" />
                    {userProgress.quizStreak} day streak
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!canTakeQuiz() ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                  <h3 className="font-semibold mb-2">Quiz Completed Today!</h3>
                  <p className="text-muted-foreground mb-4">Come back tomorrow for a new quiz</p>
                  <Badge variant="secondary">Next quiz in {24 - new Date().getHours()} hours</Badge>
                </div>
              ) : !quizStarted && !quizCompleted ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🧠</div>
                  <h3 className="font-semibold mb-2">Ready for Today's Quiz?</h3>
                  <p className="text-muted-foreground mb-4">Answer 3 questions and earn up to 45 points!</p>
                  <Button onClick={startQuiz} className="bg-walmart-yellow text-walmart-yellow-foreground hover:bg-walmart-yellow/90">
                    Start Quiz
                  </Button>
                </div>
              ) : quizCompleted ? (
                <div className="text-center py-8">
                  <Trophy className="h-12 w-12 mx-auto mb-4 text-walmart-yellow" />
                  <h3 className="font-semibold mb-2">Quiz Complete!</h3>
                  <p className="text-muted-foreground">You earned {quizScore} points</p>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-muted-foreground">
                      Question {currentQuestionIndex + 1} of {currentQuiz.length}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Timer className="h-4 w-4" />
                      <span className={`font-mono ${timeLeft <= 10 ? 'text-sale-red' : ''}`}>
                        {timeLeft}s
                      </span>
                    </div>
                  </div>
                  
                  {currentQuiz[currentQuestionIndex] && (
                    <>
                      <h3 className="font-semibold mb-4">{currentQuiz[currentQuestionIndex].question}</h3>
                      <div className="space-y-2 mb-4">
                        {currentQuiz[currentQuestionIndex].options.map((option, index) => (
                          <Button
                            key={index}
                            variant={selectedAnswer === index ? "default" : "outline"}
                            className="w-full text-left justify-start"
                            onClick={() => handleAnswerSelect(index)}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                      <Button 
                        onClick={handleNextQuestion}
                        disabled={selectedAnswer === null}
                        className="w-full"
                      >
                        {currentQuestionIndex < currentQuiz.length - 1 ? 'Next Question' : 'Finish Quiz'}
                      </Button>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Spin & Win */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span>Spin & Win</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!canSpin() ? (
                <div className="text-center py-8">
                  <Gift className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">Spin Used Today</h3>
                  <p className="text-muted-foreground mb-4">Come back tomorrow for another spin!</p>
                  <Badge variant="secondary">Next spin in {24 - new Date().getHours()} hours</Badge>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="relative mx-auto mb-6 w-32 h-32">
                    <div 
                      className="w-full h-full rounded-full border-8 border-primary bg-gradient-to-br from-walmart-yellow to-primary transition-transform duration-3000 ease-out"
                      style={{ 
                        transform: `rotate(${rotation}deg)`,
                        background: `conic-gradient(
                          from 0deg,
                          #fbbf24 0deg 72deg,
                          #3b82f6 72deg 144deg,
                          #ef4444 144deg 216deg,
                          #10b981 216deg 288deg,
                          #8b5cf6 288deg 360deg
                        )`
                      }}
                    >
                      <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center">
                        <span className="text-2xl">🎯</span>
                      </div>
                    </div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-primary"></div>
                  </div>
                  
                  {spinResult && (
                    <div className="mb-4 p-4 bg-walmart-yellow/20 rounded-lg">
                      <div className="text-2xl mb-2">{spinResult.icon}</div>
                      <h3 className="font-semibold">{spinResult.title}</h3>
                      <p className="text-sm text-muted-foreground">{spinResult.description}</p>
                    </div>
                  )}
                  
                  <Button 
                    onClick={handleSpin}
                    disabled={isSpinning}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isSpinning ? 'Spinning...' : 'Spin Now!'}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">1 spin per day</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Flash Sales */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-sale-red" />
              <span>Flash Sales</span>
              <Badge className="bg-sale-red text-sale-red-foreground">Limited Time</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {flashSales.map(item => {
                const timeRemaining = getTimeRemaining(item.endTime);
                const isExpired = timeRemaining.hours === 0 && timeRemaining.minutes === 0 && timeRemaining.seconds === 0;
                const isSoldOut = item.claimed >= item.total;
                
                return (
                  <Card key={item.id} className="relative overflow-hidden">
                    <div className="absolute top-2 right-2 z-10">
                      <Badge className="bg-sale-red text-sale-red-foreground">
                        {item.discount}% OFF
                      </Badge>
                    </div>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-40 object-cover"
                    />
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-1">{item.name}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg font-bold">${item.salePrice}</span>
                        <span className="text-sm text-muted-foreground line-through">${item.originalPrice}</span>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>{item.claimed} claimed</span>
                          <span>{item.total - item.claimed} left</span>
                        </div>
                        <Progress value={(item.claimed / item.total) * 100} className="h-2" />
                      </div>
                      
                      {!isExpired && (
                        <div className="text-center mb-3">
                          <div className="text-xs text-muted-foreground mb-1">Ends in:</div>
                          <div className="font-mono text-sm">
                            {String(timeRemaining.hours).padStart(2, '0')}:
                            {String(timeRemaining.minutes).padStart(2, '0')}:
                            {String(timeRemaining.seconds).padStart(2, '0')}
                          </div>
                        </div>
                      )}
                      
                      <Button 
                        onClick={() => handleClaimFlashSale(item)}
                        disabled={isExpired || isSoldOut}
                        className="w-full bg-walmart-yellow text-walmart-yellow-foreground hover:bg-walmart-yellow/90"
                        size="sm"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {isSoldOut ? 'Sold Out' : isExpired ? 'Expired' : 'Claim Now'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Badges & Achievements */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-walmart-yellow" />
              <span>Badges & Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {availableBadges.map(badge => {
                const isEarned = userProgress.badges.includes(badge.id);
                return (
                  <div 
                    key={badge.id}
                    className={`text-center p-4 rounded-lg border-2 transition-all ${
                      isEarned 
                        ? 'border-walmart-yellow bg-walmart-yellow/10' 
                        : 'border-muted bg-muted/30'
                    }`}
                  >
                    <div className={`text-3xl mb-2 ${isEarned ? '' : 'grayscale opacity-50'}`}>
                      {badge.icon}
                    </div>
                    <h3 className={`font-semibold text-sm mb-1 ${isEarned ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {badge.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{badge.requirement}</p>
                    {isEarned && (
                      <Badge className="mt-2 bg-walmart-yellow text-walmart-yellow-foreground text-xs">
                        Earned
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Gamification;