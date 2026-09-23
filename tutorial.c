#include<stdio.h>
int main()
{
    float base, height, hypotenuse, area, circumference;
    
    printf("enter the base of the triangle :"); 
    scanf("%f", &base);
    printf("enter the height of the triangle :");
    scanf("%f",&height);
    printf("enter the hypotenuse of the triangle :");
    scanf("%f",&hypotenuse);
    area=(base*height)/2;
    circumference=base+height+hypotenuse;

    printf("area = %f\n", area);
    printf("circumference = %f\n", circumference);

    return 0;
}